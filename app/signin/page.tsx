'use client';

import Link from 'next/link';

import { OAUTH_GOOGLE, OAUTH_KAKAO, OAUTH_NAVER } from './_business-layer/OAuth';

export default function SignIn() {
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
    </>
  );
}
