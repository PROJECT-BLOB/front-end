// postlist 안에서 데이터 불러오는 버전
import classNames from 'classnames/bind';

import CommentItem from '@/app/mypage/_components/Comment/CommentItem';
import { Comment, Post } from '@/types/Post';
import { useFetchBookmarkList, useFetchCommentList, useFetchFeedList, useFetchPostList } from '@queries/usePostQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface GetPostListProps {
  userId?: number;
  selectedTab?: string;
  // 타입 수정해주십셔...
  filteredData?: any;
}

export default function PostList({ userId, selectedTab, filteredData }: GetPostListProps) {
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
    // @queries/usePostQueries에 feedData 가져오는 쿼리 추가해서 아래 주석 제거하고 사용하시면 될 것 같습니다!!(이름은 임시로 지어둠)
    case 'Feed':
      fetchDataFunction = useFetchFeedList;
      break;
    default:
      fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정함
      break;
  }

  const { data, isPending, isError, isFetchingNextPage, ref } = userId
    ? fetchDataFunction(userId)
    : fetchDataFunction(filteredData);

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
            postsPage.data.content.map((comment: Comment) => <CommentItem key={comment.commentId} comment={comment} />),
          )
        : postsPages.map((postsPage) =>
            postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
          )}

      {/*  TODO 로딩 인디케이터 추가 */}

      {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref} />}
    </div>
  );
}
