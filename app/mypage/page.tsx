'use client';

import { useEffect } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { useFetchBookmarkList, useFetchCommentList, useFetchPostList } from '@queries/usePostQueries';
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

  // TODO: 리팩토링할지도..---------------
  let fetchDataFunction;
  switch (selectedTab) {
    case 'MyPosts':
      fetchDataFunction = useFetchPostList;
      break;
    case 'Bookmarks':
      fetchDataFunction = useFetchBookmarkList;
      break;
    case 'MyComments':
      fetchDataFunction = useFetchCommentList;
      break;
    default:
      fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정
      break;
  }

  const { data, isPending, isError, isFetchingNextPage, ref } = fetchDataFunction(userId);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }
  // TODO: 리팩토링할지도..--------------

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
        {/* <PostList userId={userId} selectedTab={selectedTab} /> */}
        <PostList
          isCommentList={selectedTab === 'MyComments'}
          postsData={data}
          isFetchingNextPage={isFetchingNextPage}
          ref={ref}
        />
      </section>
    </div>
  );
}
