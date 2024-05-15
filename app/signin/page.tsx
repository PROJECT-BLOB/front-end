'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import GoogleLogo from '@/public/icons/logo-google.svg';
import KakaoLogo from '@/public/icons/logo-kakao.svg';
import NaverLogo from '@/public/icons/logo-naver.svg';
import getRedirectUrl from '@apis/oauth/getRedirectUrl';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useOAuthStore } from '@stores/useOAuthStore';
import { useUserStore } from '@stores/userStore';

import Logo from '@components/shared/Logo';

import SigninButton from './_components/SigninButton/SigninButton';
import styles from './Signin.module.scss';

const OAUTH_PROVIDER = [
  { id: 'GOOGLE', value: 'google', iconSource: GoogleLogo, text: '구글 로그인' },
  { id: 'KAKAO', value: 'kakao', iconSource: KakaoLogo, text: '카카오 로그인' },
  { id: 'NAVER', value: 'naver', iconSource: NaverLogo, text: '네이버 로그인' },
];

export default function Signin() {
  const { accessToken, state } = useOAuthStore();
  const { isSignin } = useUserStore();

  const router = useRouter();

  const { toggleModal, setCurrentName } = useModalStore();

  // 소셜 로그인
  async function handleClickSignin(type: string) {
    const { data } = await getRedirectUrl(type);
    const { redirectUrl } = data;

    // 소셜 로그인 페이지로 이동
    router.push(redirectUrl);
  }

  useEffect(() => {
    function handleOpenModal(name: ModalName) {
      setCurrentName(name);
      toggleModal();
    }

    if (accessToken && state === 'INCOMPLETE') {
      handleOpenModal('registerUser');
    }
  }, [accessToken, state, setCurrentName, toggleModal]);

  useEffect(() => {
    if (isSignin) {
      // console.log('로그인된 유저입니다. 맵으로 이동...');
      router.push('map');
    }
  }, [isSignin, router]);

  return (
    <div className={styles.signin}>
      <Logo size='large' />
      <main className={styles.main}>
        <h1 className={styles.title}>SNS로 간편하게 로그인하기</h1>
        <div className={styles.buttons}>
          {OAUTH_PROVIDER.map((provider) => (
            <SigninButton
              key={provider.id}
              providerName={provider.value}
              iconSource={provider.iconSource}
              onClick={() => handleClickSignin(provider.value)}
            >
              {provider.text}
            </SigninButton>
          ))}
        </div>
      </main>
    </div>
  );
}
