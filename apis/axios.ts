import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === 'undefined';
const ACCESS_TOKEN = 'accessToken';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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

export default instance;

const getAccessToken = (): string | null => {
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
