'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getOAuthData from '@apis/oauth/getOAuthData';
import { useOAuthStore } from '@stores/useOAuthStore';
import { useUserStore } from '@stores/userStore';

interface providerType {
  provider: 'naver' | 'kakao' | 'google';
}

export default function LoadingSignin({ params }: { params: providerType }) {
  const { setUserId } = useUserStore();
  const router = useRouter();
  // const code = new URL(window.location.href).searchParams.get('code');
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  useEffect(() => {
    function storeOAuth(userId: number, accessToken: string, refreshToken: string, state: string) {
      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;

      useOAuthStore.setState({ userId, accessToken, refreshToken, state });

      setUserId(userId);
    }

    async function setOAuthData() {
      const { data } = await getOAuthData(params.provider, code);
      const { userId, accessToken, refreshToken, state } = data;

      storeOAuth(userId, accessToken, refreshToken, state);

      console.log('data', data);

      return state;
    }

    async function redirectBasedOnState() {
      const state = await setOAuthData();

      if (state === 'COMPLETE') {
        router.push('/map');
      } else if (state === 'INCOMPLETE') {
        router.push('/signin');
      }
    }

    redirectBasedOnState();
  }, [code, params.provider, router, setUserId]);

  return (
    <>
      <h1>{`This is OAUTH - ${params.provider} test page`}</h1>
    </>
  );
}
