'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@stores/userStore';
import { useTabStore } from '@stores/useTabStore';

import PostList from './_components/Post/PostList';
import TabList from './_components/Tab/TabList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

export default function myPage() {
  const { userId, isSignin } = useUserStore();
  const { selectedTab } = useTabStore();
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
        <TabList />
      </section>
      <section className={cx('post-list')}>
        {/* postlist 안에서 데이터 불러오는 버전 */}
        <PostList userId={userId} selectedTab={selectedTab} />
      </section>
    </div>
  );
}
