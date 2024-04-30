'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlobLogo from '@/public/icons/logo-BLOB.svg';
import GoogleLogo from '@/public/icons/logo-google.svg';
import KakaoLogo from '@/public/icons/logo-kakao.svg';
import NaverLogo from '@/public/icons/logo-naver.svg';
import { useUserStore } from '@/stores/userStore';
import getRedirectUrl from '@apis/oauth/getRedirectUrl';
import signout from '@apis/user/sign/signout';

import useRedirectSigninUserTo from '@hooks/useRedirectSigninUser';

import SigninButton from './_components/SigninButton';
import styles from './Signin.module.scss';

export default function Signin() {
  // 로그아웃-이 부분은 무시하셔도 됩니다
  const { signout: logout } = useUserStore();

  const router = useRouter();

  const userId: number = 1214; // TODO: (임시값) 서버상태에서 가져오도록 변경

  async function handleClickSignout() {
    const response = await signout(userId);

    if (response) {
      // reponse 결과가 ok면 유저의 전역상태를 false로 변경합니다.
      logout();
      // 랜딩페이지로 이동합니다.
      useRedirectSigninUserTo('/');
    }
    // 에러핸들링
  }
  // 로그아웃-이 부분은 무시하셔도 됩니다

  // 소셜 로그인
  async function handleClickSignin(type: string) {
    const { data } = await getRedirectUrl(type);
    const { redirectUrl } = data;

    // 소셜 로그인 페이지로 이동
    router.push(redirectUrl);
  }

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

      {/* 로그아웃-이 부분은 무시하셔도 됩니다 */}
      <br />
      <br />
      <button type='button' onClick={handleClickSignout}>
        로그아웃
      </button>
      {/* 로그아웃-이 부분은 무시하셔도 됩니다 */}
    </main>
  );
}
