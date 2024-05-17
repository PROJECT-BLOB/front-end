import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { SubCategoryNameMapper } from '@/app/map/_components/Map/Filter';
import { Category } from '@apis/map/getMarkers';
import { useCategoryStore } from '@stores/useCategoryStore';

import styles from './FilterSubCategoryButton.module.scss';

export type SubCategory =
  | 'WEATHER'
  | 'RESTAURANT'
  | 'ACCOMMODATION'
  | 'HOSPITAL'
  | 'TOILET'
  | 'PHARMACY'
  | 'TRANSPORT'
  | 'MUSEUM'
  | 'ATTRACTIONS'
  | 'ATM';

export const SUB_CATEGORY_NAME_MAPPER: SubCategoryNameMapper = {
  WEATHER: '날씨',
  RESTAURANT: '음식점',
  ACCOMMODATION: '숙소',
  HOSPITAL: '병원',
  TOILET: '화장실',
  PHARMACY: '약국',
  TRANSPORT: '교통',
  MUSEUM: '박물관',
  ATTRACTIONS: '관광지',
  ATM: 'ATM',
};

export interface FilterSubCategoryButtonProps {
  category?: Category | null;
  subCategory?: SubCategory;
}

export default function FilterSubCategoryButton({ category, subCategory }: FilterSubCategoryButtonProps) {
  const cx = classNames.bind(styles);

  const [isClicked, setIsClicked] = useState(false);

  const { removeListItem, addListItem, hasItem } = useCategoryStore();

  const handleClickSubCategory = () => {
    // add subCategory to selected List
    if (!isClicked) {
      // remove current state in selectedCategoryList
      removeListItem!(category!);
      addListItem!(`${category!}:${subCategory!}`);
    }
    // remove subCategory from selected List
    else {
      removeListItem!(`${category!}:${subCategory!}`);

      // if there is no current category in selectedCategoryList, add current category
      if (!hasItem(category!)) {
        addListItem(category!);
      }
    }

    setIsClicked(!isClicked);
  };
  useEffect(() => {
    setIsClicked(false);
  }, [category]);

  return (
    // eslint-disable-next-line
    <div className={cx('button', category, isClicked && 'clicked')} onClick={() => handleClickSubCategory()}>
      <span>#{SUB_CATEGORY_NAME_MAPPER[subCategory!]}</span>
      {isClicked && <button type='button'>x</button>}
    </div>
  );
}
