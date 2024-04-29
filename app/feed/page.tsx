'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useInfiniteQueries from '@queries/useInfiniteQueries';

import styles from './Feed.module.scss';

interface User {
  id: number;
  username: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

interface PostProps {
  id: number;
  content: string;
  user: User;
  createdAt: number;
  updatedAt: number;
}

export default function Feed() {
  const { postsData, isPending, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQueries('feedPage');

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div className={styles.loading}>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = postsData?.pages ?? [];

  return (
    <>
      <h1 className={styles.title}>피드 페이지</h1>

      {postsPages.map((postPage) => postPage.results.map((post: PostProps) => <Post key={post.id} post={post} />))}

      {/* TODO 로딩 인디케이터 추가 */}
      {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
    </>
  );
}

function Post({ post }: { post: PostProps }) {
  return (
    // 코드잇 api 데이터 임시로 넣어놨습니다.
    <li className={styles.post}>
      {post.user.name}: {post.content}
    </li>
  );
}
