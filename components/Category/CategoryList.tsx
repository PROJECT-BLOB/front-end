import classNames from 'classnames/bind';

import styles from './CategoryList.module.scss';
import FilterCategoryButton from './FilterCategoryButton/FilterCategoryButton';
import FilterSubCategoryButton from './FilterCategoryButton/FilterSubCategoryButton';

export const categories = ['추천', '비추천', '질문', '주의', '도움요청'] as const;

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

export type Category = (typeof categories)[number];

type SubCategory = (typeof subCategories)[number];

export type FilterType = 'MAP' | 'WRITE' | 'FEED';

interface SubCategoryState {
  name: SubCategory;
  isSelectedSubCategory: boolean;
}

export interface CategoryState {
  name: Category;
  isSelectedCategory: boolean;
  isSelectedArrow: boolean;
  subCategories: SubCategoryState[];
}

interface CategoryListProps {
  categoriesWithSub: CategoryState[];
  setCategoriesWithSub: (updater: (prev: CategoryState[]) => CategoryState[]) => void;
  filterType: FilterType;
}

const cx = classNames.bind(styles);

export default function CategoryList({ categoriesWithSub, setCategoriesWithSub, filterType }: CategoryListProps) {
  return (
    <div
      className={cx('category-list', {
        'category-list-clicked': categoriesWithSub.some((category) => category.isSelectedCategory),
      })}
    >
      {categories.map((category, categoryIndex) => (
        <FilterCategoryButton
          key={category}
          index={categoryIndex}
          filterType={filterType}
          categoriesWithSub={categoriesWithSub}
          setCategoriesWithSub={setCategoriesWithSub}
        >
          <div className={cx('sub-category-list')}>
            {subCategories.map((subCategory, subCategoryIndex) => (
              <FilterSubCategoryButton
                key={subCategory}
                categoryIndex={categoryIndex}
                index={subCategoryIndex}
                filterType={filterType}
                categoriesWithSub={categoriesWithSub}
                setCategoriesWithSub={setCategoriesWithSub}
              />
            ))}
          </div>
        </FilterCategoryButton>
      ))}
    </div>
  );
}
