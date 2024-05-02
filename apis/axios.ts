/* eslint-disable no-underscore-dangle */
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === 'undefined';
const ACCESS_TOKEN = 'accessToken';
const GET_REFRESH_URL = '/oauth/refresh';

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
      return; // TODO: Error처리
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
    const originalRequest = error.config; // error.config에 담겨있는 원래 리퀘스트를 가져온다.

    if (error.response?.status === 401 && !originalRequest._retry) {
      // 토큰 만료: 401

      // 토큰 발급 요청 시 데이터가 필요없을 경우에 undefined..추후 수정될 수 있음.
      await instance.post(GET_REFRESH_URL, undefined, { _retry: true } as AxiosRequestConfig<undefined>); // 토큰 재발급 하고

      originalRequest._retry = true;

      return instance(originalRequest); // 리퀘스트 재시도 하도록 설정
    }

    return Promise.reject(error);
  },
);

export default instance;

export const getAccessToken = (): string | null => {
  // TODO: 로그인 연결되면 쿠키에서 토큰을 가져오도록 수정
  const accessToken = getCookie(ACCESS_TOKEN);

  if (accessToken) {
    return accessToken;
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
