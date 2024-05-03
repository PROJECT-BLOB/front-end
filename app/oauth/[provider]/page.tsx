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
  const { signin } = useUserStore();
  const router = useRouter();
  // const code = new URL(window.location.href).searchParams.get('code');
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  function storeOAuth(userId: number, accessToken: string, refreshToken: string, state: string) {
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;
    document.cookie = `userId=${userId}; path=/`;

    useOAuthStore.setState({ userId, accessToken, refreshToken, state });
  }

  useEffect(() => {
    async function setOAuthData() {
      const { data } = await getOAuthData(params.provider, code);

      const { userId, accessToken, refreshToken, state } = data;

      storeOAuth(userId, accessToken, refreshToken, state);
      console.log('data', data);
    }

    setOAuthData();
    signin();
    router.push('/signin');
  }, [code, params.provider, signin, router]);

  return <h1>{`This is OAUTH - ${params.provider} test page`}</h1>;
}
