'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { APIProvider } from '@vis.gl/react-google-maps';
import Image from 'next/image';

import searchIcon from '@public/icons/search-icon-gray.svg';
import settingIcon from '@public/icons/settings-04.svg';
import useModalStore, { ModalName } from '@stores/useModalStore';

import BackToTopButton from '@components/BackToTopButton/BackToTopButton';
import CategoryBox from '@components/CategoryBox';
import PostList from '@components/Post/PostList';

import styles from './Feed.module.scss';
import Autocomplete from '../map/_components/Autocomplete/Autocomplete';
import BlobMap from '../map/_components/Map/BlobMap';

type Order = 'hot' | 'likes' | 'views' | 'recent';
const ORDERS = {
  hot: '인기순',
  recent: '최신순',
  views: '조회순',
  likes: '좋아요순',
};

export interface filteredData {
  cityLat: number;
  cityLng: number;
  sortBy: Order;
  categories: string;
  startDate: string;
  endDate: string;
  // false로 하면 전체 true로 하면 이미지 있는것만
  hasImage: boolean;
  // 이것도 이미지와 마찬가지
  hasLocation: boolean;
  minLikes: number;
  keyword: string;
}

export default function Feed() {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  // TO DO: 기본 값 설정
  const [filteredData, setFilteredData] = useState<filteredData>({
    cityLat: 37.5518911,
    cityLng: 126.9917937,
    sortBy: 'recent',
    categories: '',
    startDate: '',
    endDate: '',
    hasImage: false,
    hasLocation: false,
    minLikes: 0,
    keyword: '',
  });
  // const [countryAndCity, setCountryAndCity] = useState({ city: '서울', country: '대한민국' });
  const { toggleModal, setCurrentName } = useModalStore();

  const [categoryList, setCategoryList] = useState<string[][]>(stringCategoryListToArray(filteredData.categories));

  const { register, handleSubmit } = useForm<{ keyword: string }>();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  function handleClickOrder(order: Order) {
    setFilteredData(() => ({ ...filteredData, sortBy: order }));
  }

  function handleSubmitKeywordSearch(formData: { keyword: string }) {
    setFilteredData(() => ({ ...filteredData, keyword: formData.keyword }));
  }

  // 카테고리 x 표시 누르면 삭제된값 적용
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

  // const handleOnSelectCity = (address: string) => {
  //   let countryAndCity = address.split(' ');

  //   if (countryAndCity.length >= 3) countryAndCity = [countryAndCity[0], countryAndCity[countryAndCity.length - 1]];

  //   setCountryAndCity({ country: countryAndCity[0], city: countryAndCity[1] });
  // };

  return (
    <main className={styles.feed}>
      <section className={styles['search-country-and-filtering-container']}>
        <div>
          <span className={styles['search-mention']}>
            <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
              <Autocomplete />
              <BlobMap isDisplaying={false} />
            </APIProvider>
          </span>
        </div>
        <div className={styles['filtering-container']}>
          <div className={styles['filtering-button-wrapper']}>
            <button type='button' className={styles['filtering-mention']} onClick={() => handleClickModal('filtering')}>
              필터링
            </button>
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
        <form className={styles['input-wrapper']} onSubmit={handleSubmit(handleSubmitKeywordSearch)}>
          <input placeholder='서울에서 검색하기' className={styles.input} {...register('keyword')} />
          <button type='submit'>
            <Image src={searchIcon} alt='검색아이콘' />
          </button>
        </form>
        <div className={styles['order-container']}>
          {Object.entries(ORDERS).map((order) => (
            <button
              key={order[0]}
              className={`${styles.order} ${filteredData.sortBy === order[0] && styles.selected}`}
              type='button'
              onClick={() => handleClickOrder(order[0] as Order)}
            >
              {order[1]}
            </button>
          ))}
        </div>
      </section>
      {/* {data?.pages[0].data.count ? <PostList filteredData={filteredData} /> : '검색 결과가 없습니다'} */}
      <PostList filteredData={filteredData} selectedTab='Feed' />
      <div className={styles['back-to-top']}>
        <BackToTopButton />
      </div>
    </main>
  );
}
