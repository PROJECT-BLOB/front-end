'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { UserDetail } from '@/types/User';
import { useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';

import Tab from '@components/Tab';

import PostList from './_components/Post/PostList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

export default function myPage() {
  // TODO: 유저 정보 가져오기
  const { userId, isSignin } = useUserStore();

  const [userData, setUserData] = useState<UserDetail | null>(null);

  const router = useRouter();

  const { data, isLoading, isError, error } = useDetailQueries(userId);

  useEffect(() => {
    if (data) {
      // 데이터가 있을 때만 상태를 업데이트함
      setUserData(data.data);
    }
  }, [data]);

  useEffect(() => {
    // if (!userData) return;

    if (!isSignin) {
      router.push('/signin');
    }
  }, [isSignin, router]);

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  return (
    <div className={cx('wrappper')}>
      <section>
        <UserProfile userData={userData} />
      </section>
      <section className={cx('tabs')}>
        <Tab focused>내가 쓴 글</Tab>
        <Tab focused={false}>저장한 글</Tab>
        <Tab focused={false}>댓글 단 글</Tab>
      </section>
      <section className={cx('post-list')}>
        {/* //TODO: 임시 */}
        <PostList userId={2} />
      </section>
    </div>
  );
}
