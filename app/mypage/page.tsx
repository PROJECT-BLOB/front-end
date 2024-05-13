'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@stores/userStore';
import { useTabStore } from '@stores/useTabStore';

import BackToTopButton from '@components/BackToTopButton/BackToTopButton';
import PostList from '@components/Post/PostList';

import TabList from './_components/Tab/TabList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

export default function MyPage() {
  const { blobId, isSignin } = useUserStore();
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
        <UserProfile blobId={blobId ?? ''} isMypage />
      </section>
      <section className={cx('tabs')}>
        <TabList />
      </section>
      <section className={cx('post-list')}>
        <PostList blobId={blobId ?? ''} selectedTab={selectedTab} />
      </section>
      <div className={cx('back-to-top')}>
        <BackToTopButton />
      </div>
    </div>
  );
}
