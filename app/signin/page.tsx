'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlobLogo from '@/public/icons/logo-BLOB.svg';
import GoogleLogo from '@/public/icons/logo-google.svg';
import KakaoLogo from '@/public/icons/logo-kakao.svg';
import NaverLogo from '@/public/icons/logo-naver.svg';
import getRedirectUrl from '@apis/oauth/getRedirectUrl';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useOAuthStore } from '@stores/useOAuthStore';
import { useUserStore } from '@stores/userStore';

import ModalContainer from '@components/Modal/ModalContainer';

import SigninButton from './_components/SigninButton';
import styles from './Signin.module.scss';

export default function Signin() {
  const { accessToken, state } = useOAuthStore();
  const { isSignin } = useUserStore();

  const router = useRouter();

  const { toggleModal, setCurrentName } = useModalStore();

  function handleOpenModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

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
      console.log('accessToken:', accessToken);
      console.log('state:', state);
      handleOpenModal('createUser');
    }
  }, [accessToken, state, setCurrentName, toggleModal]);

  useEffect(() => {
    if (isSignin) {
      // 테스트를 위해 잠시 주석처리...
      console.log('로그인된 유저입니다. 맵으로 이동...');
      // router.push('map');
    }
  }, [isSignin, router]);

  return (
    <main className={styles.signin}>
      <Image className={styles.logo} src={BlobLogo} alt='Blob 로고' />
      <h1 className={styles.title}>SNS로 간편하게 로그인하기</h1>
      <section className={styles.buttons}>
        <SigninButton providerName='google' iconSource={GoogleLogo} onClick={() => handleClickSignin('google')}>
          구글 로그인
        </SigninButton>
        <SigninButton providerName='kakao' iconSource={KakaoLogo} onClick={() => handleClickSignin('kakao')}>
          카카오 로그인
        </SigninButton>
        <SigninButton providerName='naver' iconSource={NaverLogo} onClick={() => handleClickSignin('naver')}>
          네이버 로그인
        </SigninButton>
      </section>

      <p className={`${styles['title-gray']} ${styles.content}`}>
        <span>아직 BLOB 회원이 아니세요?</span>
        <Link href='/signin'>
          <span className={styles.underline}>회원가입 하기</span>
        </Link>
      </p>

      <button type='button' onClick={() => handleOpenModal('createUser')}>
        회원가입 모달 테스트용
      </button>

      <ModalContainer />
    </main>
  );
}
