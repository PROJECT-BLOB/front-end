import { useState } from 'react';

import classNames from 'classnames/bind';

import FilterCategoryButton, { Category, CATEGORY_NAME_MAPPER } from '@/app/map/_components/Map/FilterCategoryButton';
import FilterSubCategoryButton, {
  SUB_CATEGORY_NAME_MAPPER,
  SubCategory,
} from '@/app/map/_components/Map/FilterSubCategoryButton';

import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

export type CategoryNameMapper = { [K in Category]: string };

export type SubCategoryNameMapper = { [K in SubCategory]: string };

const categories = Object.keys(CATEGORY_NAME_MAPPER);
const subCategories = Object.keys(SUB_CATEGORY_NAME_MAPPER);

export type FullCategory = `${Category}:${SubCategory}` | Category;

export default function Filter() {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  return (
    <>
      <div className={cx('area')}>
        <section className={cx('')}>
          {categories.map((category, index) => (
            <FilterCategoryButton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              category={category as Category}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          ))}
        </section>
        <section className={cx('')}>
          {currentCategory &&
            //   disable-next-line
            subCategories.map((subCategory, index) => (
              <FilterSubCategoryButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                category={currentCategory}
                subCategory={subCategory as SubCategory}
              />
            ))}
        </section>
      </div>
    </>
  );
}
