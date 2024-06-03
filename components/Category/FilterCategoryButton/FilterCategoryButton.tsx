import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import AtomIcon from '@icons/atom-02.svg?component';
import ChevronRightIcon from '@icons/chevron-right.svg?component';
import MagicWandIcon from '@icons/magic-wand-02-2.svg?component';
import SignalIcon from '@icons/signal-02-2.svg?component';
import ThumbsDownIcon from '@icons/thumbs-down-orange.svg?component';
import ThumbsUpIcon from '@icons/thumbs-up-red.svg?component';

import styles from './FilterCategoryButton.module.scss';
import { Category, CategoryState, FilterType } from '../CategoryList';

const cx = classNames.bind(styles);

export interface FilterCategoryButtonProps {
  children: ReactNode;
  index: number;
  filterType: FilterType;
  categoriesWithSub: CategoryState[];
  setCategoriesWithSub: (updater: (prev: CategoryState[]) => CategoryState[]) => void;
}

function selectedIcon(category: Category) {
  const iconClass = cx('svg');
  switch (category) {
    case '추천':
      return <ThumbsUpIcon className={iconClass} />;
    case '비추천':
      return <ThumbsDownIcon className={iconClass} />;
    case '질문':
      return <AtomIcon className={iconClass} />;
    case '주의':
      return <SignalIcon className={iconClass} />;
    case '도움요청':
      return <MagicWandIcon className={iconClass} />;
    default:
      return <ThumbsUpIcon className={iconClass} />;
  }
}

export default function FilterCategoryButton({
  children,
  index,
  filterType = 'FEED',
  categoriesWithSub,
  setCategoriesWithSub,
}: FilterCategoryButtonProps) {
  const { name, isSelectedCategory, isSelectedArrow } = categoriesWithSub[index];

  const handleClickCategory = () => {
    setCategoriesWithSub((prev) => {
      const prevCategories = [...prev];

      for (const prevCategory of prevCategories) {
        resetSubCategories(prevCategory);

        if (filterType === 'FEED' && prevCategory.name === name) {
          const toggle = !prevCategory.isSelectedCategory;
          prevCategory.isSelectedCategory = prevCategory.isSelectedArrow = toggle;
        } else if (filterType === 'FEED' && prevCategory.name !== name) {
          prevCategory.isSelectedArrow = false;
        } else if (filterType === 'WRITE') {
          const isSelected = prevCategory.name === name && !prevCategory.isSelectedCategory;
          prevCategory.isSelectedCategory = prevCategory.isSelectedArrow = isSelected;
        }
      }

      return prevCategories;
    });
  };

  const handleClickArrow = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();

    setCategoriesWithSub((prev) => {
      const prevCategories = [...prev];

      if (prevCategories[index].isSelectedArrow) {
        prevCategories[index].isSelectedArrow = false;
      } else {
        for (const prevCategory of prevCategories) {
          resetSubCategories(prevCategory);

          if (filterType === 'WRITE') {
            prevCategory.isSelectedCategory = false;
          }

          prevCategory.isSelectedArrow = false;
        }

        prevCategories[index].isSelectedArrow = prevCategories[index].isSelectedCategory = true;
      }

      return prevCategories;
    });
  };

  const resetSubCategories = (category: CategoryState) => {
    if (!category.isSelectedCategory) {
      for (const subCategory of category.subCategories) {
        subCategory.isSelectedSubCategory = false;
      }
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={handleClickCategory}
        className={cx(
          'background',
          {
            [`button-clicked-color-${name}`]: isSelectedCategory,
          },
          `filtering-type-${filterType}`,
        )}
      >
        <div className={cx('svg-box')}>{selectedIcon(name)}</div>
        <span
          className={cx(
            'title',
            {
              [`button-clicked-color-${name}`]: isSelectedCategory,
            },
            `filtering-type-${filterType}`,
          )}
        >
          {name}
        </span>
        <ChevronRightIcon
          onClick={handleClickArrow}
          className={cx(
            'arrow',
            {
              rotate: isSelectedArrow,
              [`button-clicked-color-${name}`]: isSelectedCategory,
            },
            `filtering-type-${filterType}`,
          )}
        />
      </button>
      {isSelectedArrow && <>{children}</>}
    </>
  );
}
