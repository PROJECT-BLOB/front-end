/* eslint-disable no-underscore-dangle */
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === 'undefined';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    let accessToken;

    // axios 인스턴스를 사용하는 주체가 sever인지 client인지에 따라 accessToken을 가져오는 방식이 다릅니다.
    if (isServer) {
      const { cookies } = await import('next/headers');
      accessToken = cookies().get(ACCESS_TOKEN)?.value;
    } else {
      accessToken = getAccessToken();
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    if (isAxiosError(error)) {
      return;
    }

    return Promise.reject(error);
  },
);

// 인터셉터 사용해서 리스폰스를 가로채서 처리해주면 된다
instance.interceptors.response.use(
  // onFulfilled
  (response) => response,

  // onRejected
  async (error): Promise<AxiosError> => {
    const originalRequest = error.config;

    const refreshToken = getCookie(REFRESH_TOKEN);
    console.log('error.response?.message: ', error.response?.data?.message);

    if (error.response?.data?.message === '유효하지 않은 토큰입니다.') {
      // 리프레시토큰 만료
      handleRefreshTokenExpiary();
    }

    if (getRefreshToken() && error.response?.status === 401 && !originalRequest._retry) {
      // 액세스 토큰 만료
      const response = await axios.post(`${BASE_URL}/oauth/refresh`, undefined, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      } as AxiosRequestConfig<undefined>); // 토큰 재발급 하고
      originalRequest._retry = true;

      if (response.status === 200 && response.data.accessToken) {
        const { accessToken } = response.data;

        document.cookie = `accessToken=${accessToken}; path=/`;
        const newAccessToken = getAccessToken();
        error.config.headers.Authorization = `${newAccessToken}`;
      }

      return instance(originalRequest); // 리퀘스트 재시도 하도록 설정
    }

    return Promise.reject(error);
  },
);

export default instance;

export const getAccessToken = (): string | null => {
  if (isServer) {
    return null; // 서버 환경에서는 토큰을 가져올 수 없음
  }

  const accessToken = getCookie(ACCESS_TOKEN);

  if (accessToken) {
    return accessToken;
  }

  return null;
};

export const getRefreshToken = (): string | null => {
  if (isServer) {
    return null; // 서버 환경에서는 토큰을 가져올 수 없음
  }

  const refreshToken = getCookie(REFRESH_TOKEN);

  if (refreshToken) {
    return refreshToken;
  }

  return null;
};

/* eslint-disable no-useless-escape */
const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const handleRefreshTokenExpiary = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    window.location.reload();
  }
};
