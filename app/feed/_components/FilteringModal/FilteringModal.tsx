import { useState } from 'react';

import { ConfigProvider, DatePicker, Space } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';
import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseButton from '@icons/x-close.svg';
import { useFilteringStore } from '@stores/useFilteringStore';
import useModalStore from '@stores/useModalStore';

import BlobButton from '@components/Button/BlobButton';
import CategoryFiltering, { Category } from '@components/Category/CategoryFiltering';
import SubCategoryFiltering, { subCategories, SubCategory } from '@components/Category/SubCategoryFiltering';
import Checkbox from '@components/Checkbox/Checkbox';

import styles from './FilteringModal.module.scss';

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);

const categories: Category[] = ['추천', '비추천', '질문', '주의', '도움요청'];

export interface CategoryState {
  isSelected: boolean;
  subCategories: SubCategory[];
}

enum MAIN_CATEGORY {
  '추천' = 'RECOMMENDED',
  '비추천' = 'NOT_RECOMMENDED',
  '도움요청' = 'HELP',
  '질문' = 'QUESTION',
  '주의' = 'WARNING',
}

enum SUB_CATEGORY {
  '날씨' = 'WEATHER',
  '음식점' = 'RESTAURANT',
  '숙소' = 'ACCOMMODATION',
  '병원' = 'HOSPITAL',
  '화장실' = 'TOILET',
  '약국' = 'PHARMACY',
  '교통' = 'TRANSPORT',
  '박물관' = 'MUSEUM',
  '관광지' = 'ATTRACTIONS',
  'ATM' = 'ATM',
}

export default function FilteringModal() {
  const { toggleModal } = useModalStore();
  const { filteredData, setFilteredData } = useFilteringStore();

  const [date, setDate] = useState<{ startDate: undefined | string; endDate: undefined | string }>({
    startDate: '',
    endDate: '',
  });
  const [checkBox, setCheckBox] = useState({ hasImage: false, hasLocation: false });

  // TODO 추천, 비추천 등 한 줄로 줄여보기
  const [selectedCategories, setSelectedCategories] = useState<Record<Category, CategoryState>>({
    추천: { isSelected: false, subCategories: [] },
    비추천: { isSelected: false, subCategories: [] },
    질문: { isSelected: false, subCategories: [] },
    주의: { isSelected: false, subCategories: [] },
    도움요청: { isSelected: false, subCategories: [] },
  });

  // 객체 배열 카테고리 리스트로 변환
  function formatArray() {
    const result = Object.entries(selectedCategories)
      .map(([key, values]) => {
        return values.subCategories
          .map((value) => [MAIN_CATEGORY[key as keyof typeof MAIN_CATEGORY], SUB_CATEGORY[value]].join(':'))
          .join(',');
      })
      .filter(Boolean);

    // 메인 카테고리 포메팅
    Object.entries(selectedCategories).forEach((category) => {
      if (category[1].isSelected && category[1].subCategories.length === 0)
        result.push(MAIN_CATEGORY[category[0] as keyof typeof MAIN_CATEGORY]);
    });

    return result.join(',');
  }

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleSubCategoryClick = (category: Category, subcategory: SubCategory) => {
    setSelectedCategories((prevState) => {
      const prevSubCategories = prevState[category].subCategories;
      const isAlreadySelected = prevSubCategories.includes(subcategory);

      if (isAlreadySelected) {
        return {
          ...prevState,
          [category]: {
            ...prevState[category],
            subCategories: prevSubCategories.filter((currentSubCategory) => currentSubCategory !== subcategory),
          },
        };
      }

      return {
        ...prevState,
        [category]: {
          ...prevState[category],
          subCategories: [...prevSubCategories, subcategory],
        },
      };
    });
  };

  const handleClickComplete = () => {
    setFilteredData({
      ...filteredData,
      categories: formatArray(),
      startDate: date.startDate,
      endDate: date.endDate,
      hasImage: checkBox.hasImage,
      hasLocation: checkBox.hasLocation,
    });
    toggleModal();
  };

  const handleCheckImage = () => {
    setCheckBox((previousValue) => ({ ...previousValue, hasImage: !checkBox.hasImage }));
  };

  const handleCheckLocation = () => {
    setCheckBox((previousValue) => ({ ...previousValue, hasLocation: !checkBox.hasLocation }));
  };

  return (
    <>
      <div className={cx('modal')}>
        <header className={cx('header')}>
          <h1 className={cx('title')}>필터링</h1>
          <div className={cx('close')}>
            <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
          </div>
        </header>

        <form className={cx('form')}>
          <section className={cx('category-box')}>
            <h2 className={cx('sub-title')}>카테고리</h2>
            <div className={cx('category-list', { 'category-list-clicked': activeCategory })}>
              {categories.map((category) => (
                <CategoryFiltering
                  key={category}
                  category={category}
                  filteringType='feed'
                  setSelectedCategories={setSelectedCategories}
                  setActiveCategory={setActiveCategory}
                >
                  {category === activeCategory && (
                    <div className={cx('sub-category-list')}>
                      {subCategories.map((subcategory) => (
                        <SubCategoryFiltering
                          key={subcategory}
                          category={category}
                          filteringType='feed'
                          subcategory={subcategory}
                          onClick={() => handleSubCategoryClick(category, subcategory)}
                          selectedSubCategories={selectedCategories[category].subCategories}
                        />
                      ))}
                    </div>
                  )}
                </CategoryFiltering>
              ))}
            </div>
          </section>

          <section className={cx('date-box')}>
            <h2 className={cx('sub-title')}>날짜 선택</h2>
            <ConfigProvider locale={ko_KR}>
              <Space direction='vertical'>
                <RangePicker
                  popupClassName={styles.dateRangePicker}
                  placeholder={['시작날짜', '종료날짜']}
                  onChange={(dates) => {
                    if (dates) {
                      setDate({ startDate: dates[0]?.format('YYYY-MM-DD'), endDate: dates[1]?.format('YYYY-MM-DD') });
                    }
                  }}
                />
              </Space>
            </ConfigProvider>
          </section>

          <h2 className={cx('sub-title')}>추가 옵션</h2>
          <Checkbox value='' checkedItemHandler={handleCheckImage}>
            이미지가 있는 게시글만 모아보기
          </Checkbox>
          <Checkbox value='' checkedItemHandler={handleCheckLocation}>
            상세위치가 있는 게시글만 모아보기
          </Checkbox>
          <div className={styles['button-container']}>
            <div className={styles['button-box']}>
              <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={() => toggleModal()} />
            </div>

            <div className={styles['button-box']}>
              <BlobButton text='BLOB' type='button' color='button-colord-contain' onClick={handleClickComplete} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
