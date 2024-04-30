'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getAccessToken from '@apis/oauth/getAccessToken';
import { useTokenStore } from '@stores/useTokenStore';

interface providerType {
  provider: 'naver' | 'kakao' | 'google';
}

export default function LoadingSignin({ params }: { params: providerType }) {
  const router = useRouter();
  // const code = new URL(window.location.href).searchParams.get('code');
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  function storeOAuthToken(accessToken: string, refreshToken: string) {
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;

    useTokenStore.setState({ accessToken, refreshToken });
  }

  useEffect(() => {
    async function setOAuthToken() {
      const { data } = await getAccessToken(params.provider, code);
      const { accessToken, refreshToken } = data;

      storeOAuthToken(accessToken, refreshToken);
    }

    setOAuthToken();

    // 토큰 저장 후 로그인 페이지로 이동
    router.push('/signin');
  }, [code, params.provider, router]);

  return <h1>{`This is OAUTH - ${params.provider} test page`}</h1>;
}
