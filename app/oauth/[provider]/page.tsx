'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getAccessToken from '@apis/oauth/getAccessToken';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useOAuthStore } from '@stores/useOAuthStore';

interface providerType {
  provider: 'naver' | 'kakao' | 'google';
}

export default function LoadingSignin({ params }: { params: providerType }) {
  const { toggleModal, setCurrentName } = useModalStore();

  const router = useRouter();
  // const code = new URL(window.location.href).searchParams.get('code');
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  function storeOAuth(oauthId: string, accessToken: string, refreshToken: string) {
    document.cookie = `accessToken=${accessToken}; path=/`;
    document.cookie = `refreshToken=${refreshToken}; path=/`;

    useOAuthStore.setState({ oauthId, accessToken, refreshToken });
  }

  useEffect(() => {
    async function setOAuthData() {
      const { data } = await getAccessToken(params.provider, code);

      const { oauthId, accessToken, refreshToken } = data;

      storeOAuth(oauthId, accessToken, refreshToken);
      console.log('data', data);
    }

    setOAuthData();

    // 토큰 저장 후 로그인 페이지로 이동
    router.push('/signin');
  }, [code, params.provider, router]);

  // 회원가입 안 된 경우 모달 띄우기
  useEffect(() => {
    function handleOpenModal(name: ModalName) {
      setCurrentName(name);
      toggleModal();
    }
    //  && 유저는 회원가입이 안 된 상태여야함
    // GET /user/{oauthId}/oauth => state": "COMPLETE" 값 보내줌

    const { accessToken } = useOAuthStore();
    // 유저 정보 조회

    // if (accessToken && !isMember) {
    //   handleOpenModal('createUser');
    // }
  }, [code, params.provider, setCurrentName, toggleModal]);

  return <h1>{`This is OAUTH - ${params.provider} test page`}</h1>;
}
