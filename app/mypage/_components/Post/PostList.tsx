import classNames from 'classnames/bind';

import { Post } from '@/types/Post';
import { useFetchPostList } from '@queries/usePostQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

export default function PostList({ userId }: { userId: number }) {
  // 글목록 조회
  const { data, isPending, isError, isFetchingNextPage, ref } = useFetchPostList(userId);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = data?.pages ?? [];
  console.log('data', postsPages);

  return (
    <div className={cx('container')}>
      {postsPages.map((postsPage) =>
        postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
      )}
      {/*  TODO 로딩 인디케이터 추가 */}

      {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref}>더 가져오기..</div>}
    </div>
  );
}
