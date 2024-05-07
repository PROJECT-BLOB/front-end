'use client';

import { FormEvent, useEffect, useState } from 'react';

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
    categories: '',
    startDate: '2024-05-03',
    endDate: '2024-05-08',
    hasImage: false,
    hasLocation: true,
    minLikes: 0,
    keyword: '',
  });

  const [categoryList, setCategoryList] = useState<string[][]>(stringCategoryListToArray(filteredData.categories));

  const [searchInput, setSearchInput] = useState('');

  const { data, isPending, isError, isFetchingNextPage, ref, refetch } = useInfiniteScrollQuery({
    queryKey: ['feedPost'],
    queryFn: (page: number) => {
      return getFeed({ ...filteredData, page, size: 5 });
    },
  });

  function handleClickOrder(order: string) {
    setFilteredData(() => ({ ...filteredData, sortBy: order }));
  }

  function handleSubmitKeywordSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFilteredData(() => ({ ...filteredData, keyword: searchInput }));
  }

  function handleClickDeleteCategory(index: number) {
    if (categoryList) {
      const newArray = [...categoryList.slice(0, index), ...categoryList.slice(index + 1, categoryList.length)];
      setCategoryList(newArray);
      setFilteredData({ ...filteredData, categories: arrayCategoryListToArray(newArray) });
    }
  }

  // 카테고리 리스트를 2차원 배열로 변환
  function stringCategoryListToArray(stringCategory: string) {
    return stringCategory.split(',').map((category) => category.split(':'));
  }

  // 2차원 배열을 카테고리 리스트로 변환
  function arrayCategoryListToArray(arrayCategory: string[][]) {
    return arrayCategory.map((category) => category.join(':')).join(',');
  }

  useEffect(() => {
    refetch();
    // 필터값 바뀌면 데이터 다시 불러옴
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

          {/* 타입 찾아야됨 */}
          {categoryList.length
            ? categoryList?.map((category: any, index) => (
                <CategoryBox
                  key={category}
                  category={category[0]}
                  subcategory={category[1]}
                  handleClickDelete={() => handleClickDeleteCategory(index)}
                  isFeed
                />
              ))
            : ''}
        </div>
      </section>
      <section className={styles['search-and-order-container']}>
        <form className={styles['input-wrapper']} onSubmit={handleSubmitKeywordSearch}>
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
