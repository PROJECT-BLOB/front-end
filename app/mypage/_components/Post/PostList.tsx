import classNames from 'classnames/bind';

import { Post, Comment } from '@/types/Post';
import { useFetchBookmarkList, useFetchCommentList, useFetchPostList } from '@queries/usePostQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';
import CommentItem from '../Comment/CommentItem';

const cx = classNames.bind(styles);

export default function PostList({ userId, selectedTab }: { userId: number; selectedTab: string }) {
  // console.log('selectedTab', selectedTab);
  let fetchDataFunction;
  switch (selectedTab) {
    case '내가 쓴 글':
      fetchDataFunction = useFetchPostList;
      break;
    case '저장한 글':
      fetchDataFunction = useFetchBookmarkList;
      break;
    case '댓글 단 글':
      fetchDataFunction = useFetchCommentList;
      break;
    default:
      fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정
  }

  const { data, isPending, isError, isFetchingNextPage, ref } = fetchDataFunction(userId);

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
      {fetchDataFunction === useFetchCommentList
        ? postsPages.map((postsPage) =>
            // TODO: post-title, category 정보도 같이 보내야 함
            postsPage.data.content.map((post: Comment) => <CommentItem key={post.commentId} post={post} />),
          )
        : postsPages.map((postsPage) =>
            postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
          )}

      {/*  TODO 로딩 인디케이터 추가 */}

      {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref}>더 가져오기..</div>}
    </div>
  );
}
