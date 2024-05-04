'use client';

import { Post } from '@/types/Post';
import { POSTS_PAGE_LIMIT } from '@constants/pageValues';
import useInfiniteQueries from '@queries/useInfiniteQueries';

import styles from './Feed.module.scss';

// TODO: 이 부분은 추후에 수정이 필요합니다. 어떻게 데이터를 보낼 지 생각해보기..
const BODY = {
  country: '대한민국',
  city: '서울',
  sortBy: 'string',
  page: 0,
  size: POSTS_PAGE_LIMIT,
  categories: 'QUESTION',
  startDate: '2024-05-04',
  endDate: '2024-05-04',
  hasImage: true,
  hasLocation: true,
  minLikes: 0,
  keyword: '',
};

export default function Feed() {
  const { data, isPending, isError, isFetchingNextPage, ref } = useInfiniteQueries(BODY, 'feed');

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div className={styles.loading}>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = data?.pages ?? [];

  return (
    <>
      <h1 className={styles.title}>피드 페이지</h1>

      {postsPages.map((postsPage) =>
        postsPage.data.content.map((post: Post) => (
          <div key={post.postId}>
            <div className={styles.title}>{post.postId}</div>
          </div>
        )),
      )}

      {/* TODO 로딩 인디케이터 추가 */}
      {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
    </>
  );
}
