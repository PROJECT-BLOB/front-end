import { ReactNode, useState } from 'react';

import classNames from 'classnames/bind';

import AtomIcon from '@icons/atom-02.svg';
import ChevronRightIcon from '@icons/chevron-right.svg';
import MagicWandIcon from '@icons/magic-wand-02-2.svg';
import SignalIcon from '@icons/signal-02-2.svg';
import ThumbsDownIcon from '@icons/thumbs-down-orange.svg';
import ThumbsUpIcon from '@icons/thumbs-up-red.svg';

import styles from './CategoryFiltering.module.scss';

const cx = classNames.bind(styles);

export type Category = '추천' | '비추천' | '질문' | '주의' | '도움요청';

export type FilteringType = 'map' | 'writing' | 'feed';

export interface CategoryFilteringProps {
  category: Category;
  filteringType: FilteringType;
  subcategory: ReactNode;
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
  category = '추천',
  filteringType = 'writing',
  subcategory,
}: CategoryFilteringProps) {
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const handleClickCategory = () => {
    setIsCategoryClicked(!isCategoryClicked);
    setIsArrowClicked(true);
  };

  const handleClickArrow = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 버튼의 클릭 이벤트가 발생하지 않도록 함

    if (!isCategoryClicked) {
      setIsCategoryClicked(!isCategoryClicked);
    } else {
      setIsArrowClicked(!isArrowClicked);
    }
  };

  return (
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
      <div>{subcategory}</div>
    </button>
  );
}
