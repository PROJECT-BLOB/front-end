'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import getCommentList, { GetCommentList } from '@apis/post/getCommentList';
import getFeed, { GetFeed } from '@apis/post/getFeed';

export default function useInfiniteQueries(body: GetFeed | GetCommentList, variant = 'feed') {
  const queryKey = [variant];
  let queryFn;

  // variant에 따라 다른 queryFn을 사용
  if (variant === 'feed') {
    // getFeed 함수에는 GetFeed 타입의 객체만 전달하기 때문에 body가 GetFeed 타입인지 확인
    if ('country' in body) {
      queryFn = ({ pageParam = 0 }) => getFeed({ ...body, page: pageParam });
    }
  } else if (variant === 'comment') {
    if ('postId' in body) {
      queryFn = ({ pageParam = 0 }) => getCommentList({ ...body, page: pageParam });
    }
  }

  // <div ref={ref} />가 화면에 보일 때 fetchNextPage 호출
  const { ref, inView } = useInView();

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam: number) =>
      lastPage.data.hasMore ? lastPageParam + 1 : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return { data, isPending, isError, isFetchingNextPage, ref };
}
