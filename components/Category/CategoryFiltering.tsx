import { ReactNode, useState } from 'react';

import classNames from 'classnames/bind';

import AtomIcon from '@icons/atom-02.svg?component';
import ChevronRightIcon from '@icons/chevron-right.svg?component';
import MagicWandIcon from '@icons/magic-wand-02-2.svg?component';
import SignalIcon from '@icons/signal-02-2.svg?component';
import ThumbsDownIcon from '@icons/thumbs-down-orange.svg?component';
import ThumbsUpIcon from '@icons/thumbs-up-red.svg?component';

import styles from './CategoryFiltering.module.scss';
import { SubCategory } from './SubCategoryFiltering';

const cx = classNames.bind(styles);

export type Category = '추천' | '비추천' | '질문' | '주의' | '도움요청';

export type FilteringType = 'map' | 'writing' | 'feed';

export interface CategoryFilteringProps {
  children: ReactNode;
  category: Category;
  filteringType: FilteringType;
  setSelectedCategories: (updater: (prev: Record<Category, SubCategory[]>) => Record<Category, SubCategory[]>) => void;
  setActiveCategory: (category: Category) => void;
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

export default function CategoryFiltering({
  children,
  category = '추천',
  filteringType = 'writing',
  setSelectedCategories,
  setActiveCategory,
}: CategoryFilteringProps) {
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const resetSelectedCategory = (category: Category) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: [] }));
  };

  const handleClickCategory = () => {
    setIsCategoryClicked(!isCategoryClicked);
    setIsArrowClicked(true);
    setActiveCategory(category);

    // 카테고리가 클릭 된 상태에서 클릭했을 때, 선택된 카테고리를 초기화
    if (isCategoryClicked) {
      resetSelectedCategory(category);
    }
  };

  const handleClickArrow = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation(); // 버튼의 클릭 이벤트가 발생하지 않도록 함
    setActiveCategory(category);

    if (!isCategoryClicked) {
      setIsCategoryClicked(!isCategoryClicked);
      setIsArrowClicked(!isArrowClicked);
    } else {
      setIsArrowClicked(!isArrowClicked);
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={handleClickCategory}
        className={cx(
          'background',
          { [`button-clicked-color-${category}`]: isCategoryClicked },
          `filtering-type-${filteringType}`,
        )}
      >
        <div className={cx('svg-box')}>{selectedIcon(category)}</div>
        <span
          className={cx(
            'title',
            { [`button-clicked-color-${category}`]: isCategoryClicked },
            `filtering-type-${filteringType}`,
          )}
        >
          {category}
        </span>
        <ChevronRightIcon
          onClick={handleClickArrow}
          className={cx(
            'chevron-right-icon',
            {
              rotate: isCategoryClicked && isArrowClicked,
              [`button-clicked-color-${category}`]: isCategoryClicked,
            },
            `filtering-type-${filteringType}`,
          )}
        />
      </button>
      {isCategoryClicked && isArrowClicked && <>{children}</>}
    </div>
  );
}
