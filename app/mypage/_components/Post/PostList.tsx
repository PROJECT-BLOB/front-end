import { useEffect } from 'react';

import { InfiniteData, UseQueryResult } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { filteredData } from '@/app/feed/page';
import { Comment, Post } from '@/types/Post';
import { useFetchBookmarkList, useFetchCommentList, useFetchFeedList, useFetchPostList } from '@queries/usePostQueries';

import PostItem from './PostItem';
import styles from './PostList.module.scss';
import CommentItem from '../Comment/CommentItem';

const cx = classNames.bind(styles);

interface GetPostListProps {
  userId?: number;
  selectedTab?: string;
  filteredData?: filteredData;
}

type FetchDataFunctionType = {
  data: InfiniteData<any, unknown>;
  isPending: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  ref: (node?: Element | null | undefined) => void;
  refetch: () => Promise<UseQueryResult>;
};

export default function PostList({ userId, selectedTab, filteredData }: GetPostListProps) {
  let fetchDataFunction;
  switch (selectedTab) {
    case 'MyPosts':
      if (userId) fetchDataFunction = useFetchPostList(userId);

      break;
    case 'Bookmarks':
      if (userId) fetchDataFunction = useFetchBookmarkList(userId);

      break;
    case 'MyComments':
      if (userId) fetchDataFunction = useFetchCommentList(userId);

      break;
    case 'Feed':
      if (filteredData) fetchDataFunction = useFetchFeedList(filteredData);

      break;
    default:
      if (userId) fetchDataFunction = useFetchPostList(userId); // 기본값으로 내가 쓴 글을 가져오도록 설정함

      break;
  }

  const { data, isPending, isError, isFetchingNextPage, ref, refetch } = fetchDataFunction as FetchDataFunctionType;

  useEffect(() => {
    refetch();
  }, [filteredData, refetch]);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const postsPages = data?.pages ?? [];

  return (
    <div className={cx('container')}>
      {selectedTab === 'MyComments'
        ? postsPages.map((postsPage: any) =>
            // TODO: post-title, category 정보도 같이 보내야 함
            postsPage.data.content.map((post: Comment) => <CommentItem key={post.commentId} post={post} />),
          )
        : postsPages.map((postsPage: any) =>
            postsPage.data.content.map((post: Post) => <PostItem key={post.postId} post={post} />),
          )}
      {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref} />}
    </div>
  );
}
