'use client';

import Link from 'next/link';

export default function Signup() {
  return (
    <>
      <h1>소셜 로그인 페이지</h1>
      <Link href='/api/auth/google'>
        <button type='button'>구글 로그인</button>
      </Link>
      <Link href='/api/auth/kakao'>
        <button type='button'>카카오 로그인</button>
      </Link>
    </>
  );
}
