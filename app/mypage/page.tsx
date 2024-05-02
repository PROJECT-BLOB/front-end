'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { UserDetail } from '@/types/User';
import { useDetailQueries } from '@queries/useUserQueries';

import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

export default function myPage() {
  // TODO: 쿼리에서 유저 정보 가져오기

  const [userData, setUserData] = useState<UserDetail | null>(null);
  const router = useRouter();

  const { data, isLoading, isError, error } = useDetailQueries('0502'); // 임시로 아이디 넣음

  useEffect(() => {
    if (data) {
      // 데이터가 있을 때만 상태를 업데이트함
      setUserData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (!userData) return;

    const blobId = userData?.blobId;

    // TODO: 로그인 안 되어있으면 로그인 페이지로 이동-임시, 수정필요
    if (!blobId) {
      router.push('/signin');
    }
  }, [userData, router]);

  return (
    <>
      <header>HEADER-나중에 들어감</header>
      {/* {userData && <div>{userData.blobId}</div>} */}
      <section className={cx('user-profile')}>
        <UserProfile userData={userData} />
      </section>
      <section className={cx('tabs')}>탭 들어감</section>
      <section className={cx('post-list')}>
        {/* <PostList /> */}
        postlist 들어감
      </section>
    </>
  );
}
