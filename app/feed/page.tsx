'use client';

import getFeed from '@apis/post/getFeed';
import useInfiniteScrollQuery from '@queries/useInfiniteScrollQuery';

import styles from './Feed.module.scss';
import PostList from '../mypage/_components/Post/PostList';

// type order = 'hot' | 'likes' | 'views' | 'recent';

export default function Feed() {
  let filteredData = {
    country: '대한민국',
    city: '서울',
    sortBy: '',
    categories: 'QUESTION',
    startDate: '2024-05-03',
    endDate: '2024-05-06',
    hasImage: true,
    hasLocation: true,
    minLikes: 0,
    keyword: '',
  };

  const { data, isPending, isError, isFetchingNextPage, ref, refetch } = useInfiniteScrollQuery({
    queryKey: ['feedPost'],
    queryFn: (page: number) => {
      return getFeed({ ...filteredData, page, size: 5 });
    },
  });

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  function handleClickOrder(order: string) {
    filteredData = { ...filteredData, sortBy: order };
    // setFilteredDataData((previous) => ({ ...previous, sortBy: order }));
    refetch();
  }

  return (
    <div className={styles.feed}>
      <div>
        <span className={styles['search-mention']}>실시간</span>
      </div>
      <div>
        <span>필터링</span>
      </div>
      <div className={styles['order-container']}>
        <button type='button' onClick={() => handleClickOrder('hot')}>
          인기순
        </button>
        <button type='button' onClick={() => handleClickOrder('recent')}>
          최신순
        </button>
        <button type='button' onClick={() => handleClickOrder('views')}>
          조회순
        </button>
        <button type='button' onClick={() => handleClickOrder('likes')}>
          좋아요순
        </button>
      </div>
      <div>
        {data?.pages.map((page) => <PostList key={page.data.content[0].postId} postList={page.data.content} />)}
        {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
      </div>
    </div>
  );
}
