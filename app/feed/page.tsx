'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { APIProvider } from '@vis.gl/react-google-maps';
import Image from 'next/image';

import searchIcon from '@public/icons/search-icon-gray.svg';
import settingIcon from '@public/icons/settings-04.svg';
import { Order, useFilteringStore } from '@stores/useFilteringStore';
import { useMapStore } from '@stores/useMapStore';
import useModalStore, { ModalName } from '@stores/useModalStore';

import BackToTopButton from '@components/BackToTopButton/BackToTopButton';
import CategoryBox from '@components/CategoryBox';
import PostList from '@components/Post/PostList';

import styles from './Feed.module.scss';
import Autocomplete from '../map/_components/Autocomplete/Autocomplete';
import BlobMap from '../map/_components/Map/BlobMap';

const ORDERS = {
  hot: '인기순',
  recent: '최신순',
  views: '조회순',
  likes: '좋아요순',
};

export default function Feed() {
  const { lastSearchCity } = useMapStore();
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const { filteredData, setFilteredData } = useFilteringStore();
  const { toggleModal, setCurrentName } = useModalStore();
  const { register, handleSubmit } = useForm<{ keyword: string }>();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  function handleClickOrder(order: Order) {
    setFilteredData({ sortBy: order });
  }

  function handleSubmitKeywordSearch(formData: { keyword: string }) {
    setFilteredData({ keyword: formData.keyword });
  }

  // 카테고리 x 표시 누르면 삭제된값 적용
  function handleClickDeleteCategory(index: number) {
    const categoryList = stringCategoryListToArray(filteredData.categories);

    if (categoryList) {
      const newArray = [...categoryList.slice(0, index), ...categoryList.slice(index + 1, categoryList.length)];
      setFilteredData({ categories: arrayCategoryListToArray(newArray) });
    }
  }

  type Option = 'image' | 'location' | 'calendar';

  const handleClickeDeleteOption = (option: Option) => {
    if (option === 'image') setFilteredData({ ...filteredData, hasImage: false });

    if (option === 'location') setFilteredData({ ...filteredData, hasLocation: false });

    if (option === 'calendar') setFilteredData({ ...filteredData, startDate: '', endDate: '' });
  };

  // 카테고리 리스트를 2차원 배열로 변환
  function stringCategoryListToArray(stringCategory: string) {
    return stringCategory.split(',').map((category) => category.split(':'));
  }

  // 2차원 배열을 카테고리 리스트로 변환
  function arrayCategoryListToArray(arrayCategory: string[][]) {
    return arrayCategory.map((category) => category.join(':')).join(',');
  }

  // 검색 결과 달라질때마다 필터링 적용
  useEffect(() => {
    setFilteredData({
      // cityLat: lastSearchCity.location?.lat,
      // cityLng: lastSearchCity.location?.lng,
    });
  }, [lastSearchCity, setFilteredData]);

  return (
    <main className={styles.feed}>
      <section className={styles['search-country-and-filtering-container']}>
        <div>
          <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Autocomplete />
            <BlobMap isDisplaying={false} />
          </APIProvider>
          <span className={styles['search-mention']}>{`#${lastSearchCity.country} ${lastSearchCity.city}`}</span>
        </div>
        <div className={styles['filtering-container']}>
          <button
            type='button'
            className={styles['filtering-button-wrapper']}
            onClick={() => handleClickModal('filtering')}
          >
            <span className={styles['filtering-mention']}> 필터링</span>
            <Image className={styles['setting-icon']} src={settingIcon} alt='세팅아이콘' />
          </button>

          {/* 타입 찾아야됨 */}
          {filteredData.categories.length
            ? stringCategoryListToArray(filteredData.categories)?.map((category: any, index) => (
                <CategoryBox
                  key={category}
                  category={category[0]}
                  subcategory={category[1]}
                  handleClickDelete={() => handleClickDeleteCategory(index)}
                  isFeed
                />
              ))
            : ''}
          {filteredData.hasImage && (
            <CategoryBox
              isFeed
              optionData='이미지 있는 글만 모아보기'
              handleClickDelete={() => handleClickeDeleteOption('image')}
            />
          )}
          {filteredData.hasLocation && (
            <CategoryBox
              isFeed
              optionData='상세위치 있는 글만 모아보기'
              handleClickDelete={() => handleClickeDeleteOption('location')}
            />
          )}
          {filteredData.startDate && (
            <CategoryBox
              isFeed
              optionData={`${filteredData.startDate.replaceAll('-', '.').slice(2)} ~ ${filteredData.endDate.replaceAll('-', '.').slice(2)}`}
              handleClickDelete={() => handleClickeDeleteOption('calendar')}
            />
          )}
        </div>
      </section>
      <section className={styles['search-and-order-container']}>
        <form className={styles['input-wrapper']} onSubmit={handleSubmit(handleSubmitKeywordSearch)}>
          <input
            placeholder={`${lastSearchCity.city}에서 검색하기`}
            className={styles.input}
            {...register('keyword')}
          />
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
      <PostList filteredData={filteredData} selectedTab='Feed' />
      <div className={styles['back-to-top']}>
        <BackToTopButton />
      </div>
    </main>
  );
}
