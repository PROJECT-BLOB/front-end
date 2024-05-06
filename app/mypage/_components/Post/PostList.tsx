import classNames from 'classnames/bind';

import { Comment, Post } from '@/types/Post';
import { useFetchBookmarkList, useFetchCommentList, useFetchPostList } from '@queries/usePostQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';
import CommentItem from '../Comment/CommentItem';

const cx = classNames.bind(styles);

export default function PostList({ userId, selectedTab }: { userId: number; selectedTab: string }) {
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

  const postsPages = data?.pages ?? [];
  console.log('데이터', postsPages);

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
