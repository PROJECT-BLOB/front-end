'use client';

import { useEffect } from 'react';

import instance, { BASE_URL } from '@apis/axios';

export default function OauthTest() {
  const code = new URL(window.location.href).searchParams.get('code');
  const url = new URL(window.location.href);
  console.log('main', url);
  console.log(code);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await instance.get(`${BASE_URL}/oauth/google/callback?code=${code}`, { withCredentials: true });

      return data;
    };

    const result = async () =>
      await fetch().then((result) => {
        console.log('outer', result);

        if (!result) {
          return <p>not fecthed</p>;
        }
      });

    result();
  }, []);

  return <h1>This is OAUTH test page</h1>;
}

// 3. 코드를 백엔드에 보내고 toekn 받기.
// const response = await axios.get(`/oauth/token?code=${code}`, {
//     withCredentials: true,
//   });
//   const { accessToken } = response.data;
//   const { refreshToken } = response.data;
//   cookie.save("accessToken", accessToken, {
//     path: "/",
//   });
//   cookie.save("refreshToken", refreshToken, {
//     path: "/",
//   });
//   setToken;
//   dispatch(setToken(accessToken));

// 4. 여기서부터 유저에 쿠키에 token이 있으니 헤더에 계속 담김. (api>axios.ts에서 instance 설정됨.)
