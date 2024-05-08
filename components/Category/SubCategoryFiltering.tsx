import { useState } from 'react';

import classNames from 'classnames/bind';

import CloseButton from '@icons/x-close.svg';

import { Category, FilteringType } from './CategoryFiltering';
import styles from './SubCategoryFiltering.module.scss';

const cx = classNames.bind(styles);

export interface SubCategoryFilteringProps {
  category: Category;
  filteringType: FilteringType;
  title: string;
}

export default function SubCategoryFiltering({
  category = '추천',
  filteringType = 'writing',
  title = '날씨',
}: SubCategoryFilteringProps) {
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  const handleClickCategory = () => {
    setIsCategoryClicked(!isCategoryClicked);
  };

  return (
    <button
      type='button'
      onClick={handleClickCategory}
      className={cx(
        'background',
        { 'button-clicked': isCategoryClicked },
        { [`button-clicked-color-${category}`]: isCategoryClicked },
        `category-color-${category}`,
        `filtering-type-${filteringType}`,
      )}
    >
      <div
        className={cx(
          'title',
          { 'button-clicked': isCategoryClicked },
          `category-color-${category}`,
          `filtering-type-${filteringType}`,
        )}
      >
        <span>{title}</span>
        <CloseButton className={cx('close-button', { 'button-clicked': isCategoryClicked })} />
      </div>
    </button>
  );
}
