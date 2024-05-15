'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation';

import TabList from '@/app/mypage/_components/Tab/TabList';
import UserProfile from '@/app/mypage/_components/UserProfile/UserProfile';
import styles from '@/app/mypage/myPage.module.scss';
import { useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';
import { useTabStore } from '@stores/useTabStore';

import BackToTopButton from '@components/BackToTopButton/BackToTopButton';
import CtaComponent from '@components/CtaComponent/CtaComponent';
import PostList from '@components/Post/PostList';

const cx = classNames.bind(styles);

export default function UserPage() {
  const router = useRouter();
  const currentPath: string | undefined = usePathname().split('/').pop();

  const { blobId } = useUserStore();
  const { selectedTab } = useTabStore();

  // 보려는 유저의 visibility 정보를 가져옴- postlist에서 가져오려고 했는데 에러나서 일단 여기로뺌ㅠ
  const { data } = useDetailQueries(currentPath || '');

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
        {data?.data?.isPublic ? (
          <PostList blobId={currentPath ?? ''} selectedTab={selectedTab} />
        ) : (
          <CtaComponent title='비공개 계정이에요' />
        )}
      </section>
      <div className={cx('back-to-top')}>
        <BackToTopButton />
      </div>
    </div>
  );
}
