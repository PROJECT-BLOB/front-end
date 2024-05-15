// import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { APIProvider } from '@vis.gl/react-google-maps';
import classNames from 'classnames/bind';
import Image from 'next/image';

import Autocomplete from '@/app/map/_components/Autocomplete/Autocomplete';
import BlobMap from '@/app/map/_components/Map/BlobMap';
import useCreateForm from '@/app/map/_hooks/useCreateForm';
import CloseButton from '@/public/icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

// import CategoryFiltering from '@components/Category/CategoryFiltering';
// import SubCategoryFiltering, { subCategories } from '@components/Category/SubCategoryFiltering';
import ImageUploader from '@components/ImageUploader';

import PositionDetail from './PositionDetail';
import PostModalInput from './PostModalInput';
import styles from './WritePost.module.scss';
import BlobButton from '../../Button/BlobButton';

const cx = classNames.bind(styles);

export default function WritePost() {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';
  const { toggleModal } = useModalStore();
  const { errors, register, handleSubmit, onSubmit, cancelForm, setValue } = useCreateForm(toggleModal);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // const handleCategoryClick = (category: string) => {
  //   setSelectedCategory(category);
  //   setSelectedSubCategory(null); // 카테고리를 선택하면 서브카테고리 선택을 초기화
  // };

  // const handleSubCategoryClick = (subcategory: string) => {
  //   setSelectedSubCategory(subcategory);
  // };

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
          {/* <div className={cx('category-list')}>
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
          </div> */}
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
