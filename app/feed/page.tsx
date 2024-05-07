'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import getFeed from '@apis/post/getFeed';
import searchIcon from '@public/icons/search-icon-gray.svg';
import settingIcon from '@public/icons/settings-04.svg';
import useInfiniteScrollQuery from '@queries/useInfiniteScrollQuery';

import CategoryBox from '@components/CategoryBox';

import styles from './Feed.module.scss';
import PostList from '../mypage/_components/Post/PostList';

// type order = 'hot' | 'likes' | 'views' | 'recent';
const ORDERS = [
  ['hot', '인기순'],
  ['recent', '최신순'],
  ['views', '조회순'],
  ['likes', '좋아요순'],
];

export default function Feed() {
  const [filteredData, setFilteredData] = useState({
    country: '대한민국',
    city: '서울',
    sortBy: 'recent',
    categories: 'QUESTION:WEATHER,RECOMMENDED',
    startDate: '2024-05-03',
    endDate: '2024-05-08',
    hasImage: false,
    hasLocation: true,
    minLikes: 0,
    keyword: '',
  });

  const [searchInput, setSearchInput] = useState('');

  const { data, isPending, isError, isFetchingNextPage, ref, refetch } = useInfiniteScrollQuery({
    queryKey: ['feedPost'],
    queryFn: (page: number) => {
      return getFeed({ ...filteredData, page, size: 5 });
    },
  });

  function handleClickOrder(order: string) {
    setFilteredData(() => ({ ...filteredData, sortBy: order }));
    // setFilteredDataData((previous) => ({ ...previous, sortBy: order }));
  }

  function handleClickSearch(e) {
    e.preventDefault();
    setFilteredData(() => ({ ...filteredData, keyword: searchInput }));
  }

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

  return (
    <main className={styles.feed}>
      <section className={styles['search-country-and-filtering-container']}>
        <div>
          <span className={styles['search-mention']}>실시간 #부에노스아이레스</span>
        </div>
        <div className={styles['filtering-container']}>
          <div className={styles['filtering-button-wrapper']}>
            <span className={styles['filtering-mention']}>필터링</span>
            <Image className={styles['setting-icon']} src={settingIcon} alt='세팅아이콘' />
          </div>
          <CategoryBox category='HELP' subcategory='wow' isFeed />
          <CategoryBox category='NOT_RECOMMENDED' subcategory='wow' isFeed />
          <CategoryBox category='QUESTION' subcategory='wow' isFeed />
          <CategoryBox category='RECOMMENDED' subcategory='wow' isFeed />
          <CategoryBox category='WARNING' subcategory='wow' isFeed />
        </div>
      </section>
      <section className={styles['search-and-order-container']}>
        <form className={styles['input-wrapper']} onSubmit={handleClickSearch}>
          <input
            placeholder='서울에서 검색하기'
            className={styles.input}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type='submit'>
            <Image src={searchIcon} alt='검색아이콘' />
          </button>
        </form>
        <div className={styles['order-container']}>
          {ORDERS.map((order) => (
            <button
              key={order[0]}
              className={`${styles.order} ${filteredData.sortBy === order[0] && styles.selected}`}
              type='button'
              onClick={() => handleClickOrder(order[0])}
            >
              {order[1]}
            </button>
          ))}
        </div>
      </section>
      <section>
        {data?.pages[0].data.count
          ? data?.pages.map((page) => <PostList key={page.data.content[0].postId} postList={page.data.content} />)
          : '검색 결과가 없습니다'}
        {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
      </section>
    </main>
  );
}
