import { useState } from 'react';

import classNames from 'classnames/bind';

import { useFilteringStore } from '@stores/useFilteringStore';
import useModalStore from '@stores/useModalStore';

import BlobButton from '@components/Button/BlobButton';
import CategoryList, { categories, subCategories } from '@components/Category/CategoryList';

import convertCategoriesWithSub from '@utils/convertCategoriesWithSub';

import CheckboxList from './CheckboxList';
import FilterDate from './FilterDate';
import styles from './FilterModal.module.scss';
import ModalHeader from './ModalHeader';

const initialCategoriesWithSub = categories.map((category) => ({
  name: category,
  isSelectedCategory: false,
  isSelectedArrow: false,
  subCategories: subCategories.map((subCategory) => ({
    name: subCategory,
    isSelectedSubCategory: false,
  })),
}));

const cx = classNames.bind(styles);

export default function FilterModal() {
  const { toggleModal } = useModalStore();
  const { filteredData, setFilteredData } = useFilteringStore();
  const [categoriesWithSub, setCategoriesWithSub] = useState(initialCategoriesWithSub);

  const [date, setDate] = useState<{ startDate: undefined | string; endDate: undefined | string }>({
    startDate: '',
    endDate: '',
  });
  const [checkBox, setCheckBox] = useState({ hasImage: false, hasLocation: false });

  const submitFilteredData = () => {
    setFilteredData({
      ...filteredData,
      categories: convertCategoriesWithSub(categoriesWithSub),
      startDate: date.startDate,
      endDate: date.endDate,
      hasImage: checkBox.hasImage,
      hasLocation: checkBox.hasLocation,
    });
    toggleModal();
  };

  return (
    <>
      <div className={cx('modal')}>
        <ModalHeader />
        <form className={cx('form')}>
          <section className={cx('category-box')}>
            <h2 className={cx('sub-title')}>카테고리</h2>
            <CategoryList
              categoriesWithSub={categoriesWithSub}
              setCategoriesWithSub={setCategoriesWithSub}
              filterType='FEED'
            />
          </section>

          <FilterDate setDate={setDate} />
          <CheckboxList checkBox={checkBox} setCheckBox={setCheckBox} />

          <div className={cx('button-container')}>
            <div className={cx('button-box')}>
              <BlobButton text='취소' type='button' color='button-gray-outlined' onClick={() => toggleModal()} />
            </div>
            <div className={cx('button-box')}>
              <BlobButton text='BLOB' type='submit' color='button-colord-contain' onClick={submitFilteredData} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
