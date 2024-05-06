'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@stores/userStore';

import Tab from '@components/Tab';

import PostList from './_components/Post/PostList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

export default function myPage() {
  // TODO: 유저 정보 가져오기
  const { userId, isSignin } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (!isSignin) {
      router.push('/signin');
    }
  }, [isSignin, router]);

  return (
    <div className={cx('wrappper')}>
      <section>
        <UserProfile userId={userId} />
      </section>
      <section className={cx('tabs')}>
        <Tab focused>내가 쓴 글</Tab>
        <Tab focused={false}>저장한 글</Tab>
        <Tab focused={false}>댓글 단 글</Tab>
      </section>
      <section className={cx('post-list')}>
        <PostList userId={userId} />
      </section>
    </div>
  );
}
