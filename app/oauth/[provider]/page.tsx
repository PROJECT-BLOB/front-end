'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getOAuthData from '@apis/oauth/getOAuthData';
import { REDIRECT_URL_SIGN_IN_COMPLETE, REDIRECT_URL_SIGN_IN_INCOMPLETE } from '@constants/redirectUrls';
import { useOAuthStore } from '@stores/useOAuthStore';
import { useUserStore } from '@stores/userStore';

import Loading from '@components/Loading/Loading';

import styles from './AwaitSignin.module.scss';

interface providerType {
  provider: 'naver' | 'kakao' | 'google';
}

export default function AwaitSignin({ params }: { params: providerType }) {
  const { signin, signout, setBlobId } = useUserStore();
  const { setOAuth } = useOAuthStore();

  const router = useRouter();
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  useEffect(() => {
    function storeOAuth(blobId: string, accessToken: string, refreshToken: string, state: string) {
      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;
      setOAuth(blobId, accessToken, refreshToken, state);

      setBlobId(blobId);
    }

    async function setOAuthData() {
      const { data } = await getOAuthData(params.provider, code);
      const { blobId, accessToken, refreshToken, state } = data;

      storeOAuth(blobId, accessToken, refreshToken, state);

      return state;
    }

    async function redirectBasedOnState() {
      const state = await setOAuthData();
      console.log(state);

      if (state === 'COMPLETE') {
        signin();
        router.push(REDIRECT_URL_SIGN_IN_COMPLETE);
      } else if (state === 'INCOMPLETE') {
        router.push(REDIRECT_URL_SIGN_IN_INCOMPLETE);
      }
    }

    redirectBasedOnState();
  }, [code, params.provider, router, setBlobId, signin, signout, setOAuth]);

  return (
    <main className={styles.main}>
      <Loading />
      <h1 className={styles.title}>{`${params.provider} 로그인 중`}</h1>
    </main>
  );
}
