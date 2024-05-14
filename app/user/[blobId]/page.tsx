'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation';

import TabList from '@/app/mypage/_components/Tab/TabList';
import UserProfile from '@/app/mypage/_components/UserProfile/UserProfile';
import styles from '@/app/mypage/myPage.module.scss';
import { useUserStore } from '@stores/userStore';
import { useTabStore } from '@stores/useTabStore';

import BackToTopButton from '@components/BackToTopButton/BackToTopButton';
import PostList from '@components/Post/PostList';

const cx = classNames.bind(styles);

export default function UserPage() {
  const router = useRouter();
  const currentPath = usePathname().split('/').pop();

  const { blobId } = useUserStore();
  const { selectedTab } = useTabStore();

  // 본인 유저페이지로 접근 시도하면 마이페이지로 리다이렉트
  useEffect(() => {
    if (currentPath === blobId) {
      router.push('/mypage');
    }
  }, [router, blobId, currentPath]);

  return (
    <div className={cx('wrappper')}>
      <section>
        <UserProfile blobId={currentPath ?? ''} />
      </section>
      <section className={cx('tabs')}>
        <TabList />
      </section>

      <section className={cx('post-list')}>
        <PostList isUserPage blobId={currentPath ?? ''} selectedTab={selectedTab} />
      </section>
      <div className={cx('back-to-top')}>
        <BackToTopButton />
      </div>
    </div>
  );
}
