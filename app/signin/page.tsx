'use client';

import Image from 'next/image';
import Link from 'next/link';

import BlobLogo from '@/public/icons/logo-BLOB.svg';
import KakaoLogo from '@/public/icons/logo-kakao.svg';
import NaverLogo from '@/public/icons/logo-naver.svg';
import { useUserStore } from '@/stores/userStore';
import signout from '@apis/sign/signout';

import useRedirectSigninUserTo from '@hooks/useRedirectSigninUser';

import { OAUTH_GOOGLE, OAUTH_KAKAO, OAUTH_NAVER } from './_business-layer/OAuth';
import SigninButton from './_components/SigninButton';
import styles from './Signin.module.scss';

export default function Signin() {
  // 로그아웃-이 부분은 무시하셔도 됩니다
  const { signout: logout } = useUserStore();

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

  return (
    <div className={styles.signin}>
      <Image className={styles.logo} src={BlobLogo} alt='Blob 로고' />
      <div className={styles.title}>SNS로 간편하게 로그인하기</div>
      <div className={styles.buttons}>
        <Link href={OAUTH_GOOGLE}>
          <SigninButton providerName='google' iconSource={NaverLogo}>
            구글 로그인
          </SigninButton>
        </Link>
        <Link href={OAUTH_KAKAO}>
          <SigninButton providerName='kakao' iconSource={KakaoLogo}>
            카카오 로그인
          </SigninButton>
        </Link>
        <Link href={OAUTH_NAVER}>
          <SigninButton providerName='naver' iconSource={NaverLogo}>
            네이버 로그인
          </SigninButton>
        </Link>
      </div>

      {/* <p className={`${styles['title-gray']} ${styles.underline}`}> */}
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
    </div>
  );
}
