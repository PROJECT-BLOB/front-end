import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { APIProvider } from '@vis.gl/react-google-maps';
import classNames from 'classnames/bind';
import Image from 'next/image';

import Autocomplete from '@/app/map/_components/Autocomplete/Autocomplete';
import BlobMap from '@/app/map/_components/Map/BlobMap';
import useCreateForm from '@/app/map/_hooks/useCreateForm';
import CloseButton from '@/public/icons/x-close.svg';
// import { useFilteringStore } from '@stores/useFilteringStore';
import useModalStore from '@stores/useModalStore';

import CategoryFiltering, { Category } from '@components/Category/CategoryFiltering';
import SubCategoryFiltering, { subCategories, SubCategory } from '@components/Category/SubCategoryFiltering';
import ImageUploader from '@components/ImageUploader';

import PositionDetail from './PositionDetail';
import PostModalInput from './PostModalInput';
import styles from './WritePost.module.scss';
import BlobButton from '../../Button/BlobButton';

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

export default function WritePost() {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';
  const { toggleModal } = useModalStore();
  // const { errors, register, handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal, formatArray);
  // const { filteredData, setFilteredData } = useFilteringStore();

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
  // useCreateForm을 호출하는 시점에서 selectedCategories를 인자로 넘기도록 수정

  const { errors, register, handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal, formatArray);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} encType='multipart/form-data'>
      <header className={cx('close-header')}>
        <span>글쓰기</span>
        <span className={cx('close-button')}>
          <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
        </span>
      </header>
      <div className={cx('post-body')}>
        <div className={cx('body-content')}>
          <p className={cx('title')}>
            카테고리<span className={cx('force')}> * </span>
          </p>
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
          <PostModalInput
            required
            register={register as unknown as UseFormRegister<FieldValues>}
            labelName='제목'
            id='title'
            name='title'
            placeholder='제목은 필수입니다'
            maxLength={20}
            errors={errors}
          />
          <PostModalInput
            required
            register={register as unknown as UseFormRegister<FieldValues>}
            labelName='내용'
            id='content'
            name='content'
            placeholder='내용을 입력해주세요'
            maxLength={2000}
            errors={errors}
          />
          <p className={cx('title')}> 어디에 관한 글인가요? (도시까지)</p>
          <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Autocomplete type='mini' />
            <BlobMap isDisplaying={false} />
          </APIProvider>
          <PositionDetail />
        </div>
        <div className={cx('body-image')}>
          <p className={cx('title')}>사진업로드(최대5장) - 최대 5mb</p>
          <ImageUploader setValue={setValue} />
        </div>
      </div>
      <div className={cx('post-footer')}>
        <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={cancelForm} />
        <BlobButton text='BLOB' type='submit' color='button-colord-contain' />
      </div>
    </form>
  );
}
