'use client';

import Link from 'next/link';

import { useUserStore } from '@/stores/userStore';
import signout from '@apis/sign/signout';

import useRedirectSigninUserTo from '@hooks/useRedirectSigninUser';

import { OAUTH_GOOGLE, OAUTH_KAKAO, OAUTH_NAVER } from './_business-layer/OAuth';

export default function Signin() {
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

  return (
    <>
      <h1>회원가입 페이지</h1>
      <Link href={OAUTH_GOOGLE}>
        <button type='button'>구글 회원가입</button>
      </Link>
      <Link href={OAUTH_KAKAO}>
        <button type='button'>카카오 회원가입</button>
      </Link>
      <Link href={OAUTH_NAVER}>
        <button type='button'>네이버 회원가입</button>
      </Link>
      <Link href='/signin'>로그인하러 가기</Link>

      <button type='button' onClick={handleClickSignout}>
        로그아웃
      </button>
    </>
  );
}
