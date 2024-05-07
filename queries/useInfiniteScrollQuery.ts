'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

export default function useInfiniteScrollQuery(queryOptions: {
  queryKey: readonly (string | number)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (page: number) => Promise<any>;
}) {
  const { queryKey, queryFn } = queryOptions;

  const { ref, inView } = useInView();

  const { isLoading, data, isPending, isError, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam: number) =>
      lastPage.data.hasMore ? lastPageParam + 1 : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return { data, isPending, isError, isFetchingNextPage, ref, refetch, isLoading };
}
