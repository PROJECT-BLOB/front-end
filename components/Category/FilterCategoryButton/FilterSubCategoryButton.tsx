import classNames from 'classnames/bind';

import styles from './FilterSubCategoryButton.module.scss';
import { CategoryState, FilterType } from '../CategoryList';

const cx = classNames.bind(styles);

export interface FilterSubCategoryButtonProps {
  categoryIndex: number;
  index: number;
  filterType: FilterType;
  categoriesWithSub: CategoryState[];
  setCategoriesWithSub: (updater: (prev: CategoryState[]) => CategoryState[]) => void;
}

export default function FilterSubCategoryButton({
  categoryIndex,
  index,
  filterType = 'FEED',
  categoriesWithSub,
  setCategoriesWithSub,
}: FilterSubCategoryButtonProps) {
  const { name: categoryName } = categoriesWithSub[categoryIndex];
  const { name: subCategoryName, isSelectedSubCategory } = categoriesWithSub[categoryIndex].subCategories[index];

  const handleClickSubCategory = () => {
    setCategoriesWithSub((prev) => {
      const prevCategories = [...prev];

      for (const subCategory of prevCategories[categoryIndex].subCategories) {
        if (filterType === 'FEED' && subCategory.name === subCategoryName) {
          subCategory.isSelectedSubCategory = !subCategory.isSelectedSubCategory;
        } else if (filterType === 'WRITE') {
          subCategory.isSelectedSubCategory = false;

          if (subCategory.name === subCategoryName) {
            subCategory.isSelectedSubCategory = !subCategory.isSelectedSubCategory;
          }
        }
      }

      return prevCategories;
    });
  };

  return (
    <button
      type='button'
      onClick={handleClickSubCategory}
      className={cx(
        'background',
        { 'button-clicked': isSelectedSubCategory },
        { [`button-clicked-color-${categoryName}`]: isSelectedSubCategory },
        `category-color-${categoryName}`,
        `filtering-type-${filterType}`,
      )}
    >
      <div
        className={cx(
          'title',
          { 'button-clicked': isSelectedSubCategory },
          `category-color-${categoryName}`,
          `filtering-type-${filterType}`,
        )}
      >
        <span>{subCategoryName}</span>
      </div>
    </button>
  );
}
