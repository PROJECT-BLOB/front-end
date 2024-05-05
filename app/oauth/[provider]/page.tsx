'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getOAuthData from '@apis/oauth/getOAuthData';
import { useOAuthStore } from '@stores/useOAuthStore';
import { useUserStore } from '@stores/userStore';

interface providerType {
  provider: 'naver' | 'kakao' | 'google';
}

export default function AwaitSignin({ params }: { params: providerType }) {
  const { signin, signout, setUserId } = useUserStore();
  const { setOAuth } = useOAuthStore();

  const router = useRouter();
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  useEffect(() => {
    function storeOAuth(userId: number, accessToken: string, refreshToken: string, state: string) {
      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;
      setOAuth(userId, accessToken, refreshToken, state);

      setUserId(userId);
    }

    async function setOAuthData() {
      const { data } = await getOAuthData(params.provider, code);
      const { userId, accessToken, refreshToken, state } = data;

      storeOAuth(userId, accessToken, refreshToken, state);

      return state;
    }

    async function redirectBasedOnState() {
      const state = await setOAuthData();
      console.log(state);

      if (state === 'COMPLETE') {
        signin();
        router.push('/map');
      } else if (state === 'INCOMPLETE') {
        // TODO: 로그아웃 기능이 아직 없어서 임시로 넣어둠-나중에 지울 것
        signout();
        router.push('/signin');
      }
    }

    redirectBasedOnState();
  }, [code, params.provider, router, setUserId, signin, signout, setOAuth]);

  return (
    <>
      <h1>{`This is OAUTH - ${params.provider} test page`}</h1>
    </>
  );
}
