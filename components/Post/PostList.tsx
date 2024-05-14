import { useEffect } from 'react';

import classNames from 'classnames/bind';

import { filteredData } from '@/app/feed/page';
import CommentItem from '@/app/mypage/_components/Comment/CommentItem';
import { Comment, Post } from '@/types/Post';
import { useFetchBookmarkList, useFetchCommentList, useFetchFeedList, useFetchPostList } from '@queries/usePostQueries';
import { useDetailQueries } from '@queries/useUserQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';
// import CtaComponent from '@components/CtaComponent/CtaComponent';

const cx = classNames.bind(styles);

interface GetPostListProps {
  blobId?: string;
  selectedTab?: string;
  filteredData?: filteredData;
  isUserPage?: boolean;
}

// TODO: 이 파일 전체 리팩토링 해야됨
export default function PostList({ blobId, selectedTab, filteredData, isUserPage }: GetPostListProps) {
  const {
    data: userData,
    // isLoading: isUserDataLoading,
    // isError: isUserDataError,
    // error: userDataError,
  } = useDetailQueries(blobId || '');
  // console.log(userData);
  const isPublic: boolean = userData?.data?.isPublic ?? false;
  console.log(isPublic);

  // 찾아야함
  let fetchDataFunction: any;
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
    case 'Feed':
      fetchDataFunction = useFetchFeedList;
      break;
    default:
      fetchDataFunction = useFetchPostList; // 기본값으로 내가 쓴 글을 가져오도록 설정함
      break;
  }

  const {
    data: postsData,
    isPending,
    isError,
    isFetchingNextPage,
    ref,
    refetch,
  } = isPublic && (blobId ? fetchDataFunction(blobId) : fetchDataFunction(filteredData));

  useEffect(() => {
    if (isPublic) refetch();
  }, [filteredData, refetch, isPublic]);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = postsData?.pages ?? [];

  // 비공개 계정 && 유저페이지일 경우
  if (!isPublic && isUserPage) {
    // TODO: cta 추가
    return <div>비공개계정입니다.</div>;
  }

  // 공개 계정 || 마이페이지일 경우
  if (isPublic || !isUserPage) {
    return (
      <div className={cx('container')}>
        {fetchDataFunction === useFetchCommentList
          ? postsPages.map((postsPage: { data: { content: Comment[] } }) =>
              postsPage.data.content.map((comment) => <CommentItem key={comment.commentId} comment={comment} />),
            )
          : postsPages.map((postsPage: { data: { content: Post[] } }) =>
              postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
            )}
        {/* <CtaComponent /> */}
        {/*  TODO 로딩 인디케이터 추가 */}

        {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref} />}
      </div>
    );
  }
}
