'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlobLogo from '@/public/icons/logo-BLOB.svg';
// import KakaoLogo from '@/public/icons/logo-kakao.svg';
import NaverLogo from '@/public/icons/logo-naver.svg';
import { useUserStore } from '@/stores/userStore';
import getRedirectUrl from '@apis/oauth/getRedirectUrl';
import signout from '@apis/user/sign/signout';

import useRedirectSigninUserTo from '@hooks/useRedirectSigninUser';

// import { OAUTH_GOOGLE, OAUTH_KAKAO, OAUTH_NAVER } from './_business-layer/OAuth';
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
    // 1. 소셜 로그인 URL 받아오기
    const response = await getRedirectUrl(type);
    const { redirectUrl } = response.data;

    // 받아온 URL로 이동해서 로그인 후
    // 구글 로그인 페이지로 이동하는 url
    router.push(redirectUrl);

    // 구글 로그인 성공하면 이동된 페이지 url
    // http://ec2-13-124-35-140.ap-northeast-2.compute.amazonaws.com:9000/oauth/google/callback?code=4%2F0AeaYSHA8-C7mJYXJv1g23hlwudtwgWeUbPkW6jwpm7dbQW7ITU9qkzGg8PLCAy26agn0Yg&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=1&prompt=consent
    // 2. url에서 코드 받아오기 - OAuth.ts 참고
    //     let code = new URL(window.location.href).searchParams.get("code");
    // const response2 = await instance.get(
    //          `${API 서버 주소}/oauth/token?code=${code}`,
    //          { withCredentials: true }
    //        );

    // {"oauthId":"100619794358785098872","accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJvYXV0aElkIjoiMTAwNjE5Nzk0MzU4Nzg1MDk4ODcyIiwiaWF0IjoxNzE0MTIyODQ0LCJleHAiOjE3MTQxMjY0NDR9.N3kZktcobQxvbAyY0INiLgNxH7WwKe-V1udchIaBAbY","refreshToken":"eyJhbGciOiJIUzI1NiJ9.eyJvYXV0aElkIjoiMTAwNjE5Nzk0MzU4Nzg1MDk4ODcyIiwiaWF0IjoxNzE0MTIyODQ0LCJleHAiOjE3MTQxMzAwNDR9.-HqsN5QypVXivig-9gVrzDZLt9SMDXUxlgUj1UuEDKk"}
  }

  return (
    <div className={styles.signin}>
      <Image className={styles.logo} src={BlobLogo} alt='Blob 로고' />
      <div className={styles.title}>SNS로 간편하게 로그인하기</div>
      <div className={styles.buttons}>
        <SigninButton providerName='google' iconSource={NaverLogo} onClick={() => handleClickSignin('google')}>
          구글 로그인
        </SigninButton>

        {/* <Link href={OAUTH_KAKAO}>
          <SigninButton providerName='kakao' iconSource={KakaoLogo}>
            카카오 로그인
          </SigninButton>
        </Link>
        <Link href={OAUTH_NAVER}>
          <SigninButton providerName='naver' iconSource={NaverLogo}>
            네이버 로그인
          </SigninButton>
        </Link> */}
      </div>

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
