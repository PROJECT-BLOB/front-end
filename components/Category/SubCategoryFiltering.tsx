import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { Category, FilteringType } from './CategoryFiltering';
import styles from './SubCategoryFiltering.module.scss';

const cx = classNames.bind(styles);

export const subCategories = [
  '날씨',
  '음식점',
  '숙소',
  '병원',
  '화장실',
  '약국',
  '교통',
  '박물관',
  '관광지',
  'ATM',
] as const;

export type SubCategory = (typeof subCategories)[number];

export interface SubCategoryFilteringProps {
  category: Category;
  filteringType: FilteringType;
  subcategory: SubCategory;
  onClick: () => void;
  selectedSubCategories: SubCategory[];
}

export default function SubCategoryFiltering({
  category = '추천',
  filteringType = 'writing',
  subcategory = '날씨',
  onClick,
  selectedSubCategories,
}: SubCategoryFilteringProps) {
  const [isSubCategoryClicked, setIsSubCategoryClicked] = useState(false);

  const handleClickSubCategory = () => {
    setIsSubCategoryClicked(!isSubCategoryClicked);
    onClick();
  };

  useEffect(() => {
    if (selectedSubCategories.includes(subcategory)) {
      setIsSubCategoryClicked(true);
    }
  }, [subcategory, selectedSubCategories]);

  return (
    <button
      type='button'
      onClick={handleClickSubCategory}
      className={cx(
        'background',
        { 'button-clicked': isSubCategoryClicked },
        { [`button-clicked-color-${category}`]: isSubCategoryClicked },
        `category-color-${category}`,
        `filtering-type-${filteringType}`,
      )}
    >
      <div
        className={cx(
          'title',
          { 'button-clicked': isSubCategoryClicked },
          `category-color-${category}`,
          `filtering-type-${filteringType}`,
        )}
      >
        <span>{subcategory}</span>
      </div>
    </button>
  );
}
