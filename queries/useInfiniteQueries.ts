'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import getPosts from '@apis/user/mypage/testPost';
import { POSTS_PAGE_LIMIT } from '@constants/pageValues';

export default function useInfiniteQueries(variant: 'feedPage') {
  const queryKey = [variant];
  let queryFn;

  // variant에 따라 다른 queryFn을 사용
  if (variant === 'feedPage') {
    // eslint-disable-next-line prefer-const
    queryFn = ({ pageParam = 0 }) => getPosts(pageParam, POSTS_PAGE_LIMIT);
  }

  const {
    data: postsData,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam: number) => (lastPage.hasMore ? lastPageParam + 1 : undefined),
  });

  return { postsData, isPending, isError, fetchNextPage, isFetchingNextPage };
}
