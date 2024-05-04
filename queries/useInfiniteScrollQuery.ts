'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryBody {
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFunction<T extends QueryBody> = (body: T) => Promise<any>;

export default function useInfiniteScrollQuery<T extends QueryBody>(
  apiFunction: ApiFunction<T>,
  body: T,
  queryKey: string[],
) {
  const queryFn = ({ pageParam = 0 }) => apiFunction({ ...body, page: pageParam });

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
