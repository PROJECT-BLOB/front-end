import { useState } from 'react';

import classNames from 'classnames/bind';

import { MarkerType } from '@/app/map/_components/Marker';
import AtomIcon from '@icons/atom-02.svg';
import ChevronRightIcon from '@icons/chevron-right.svg';
import MagicWandIcon from '@icons/magic-wand-02-2.svg';
import SignalIcon from '@icons/signal-02-2.svg';
import ThumbsDownIcon from '@icons/thumbs-down-orange.svg';
import ThumbsUpIcon from '@icons/thumbs-up-red.svg';

import styles from './CategoryFiltering.module.scss';

const cx = classNames.bind(styles);

export interface CategoryFilteringProps {
  categoryFilteringType: MarkerType;
  title: string;
}

function selectedIcon(categoryFilteringType: MarkerType) {
  const iconClass = cx('svg');
  switch (categoryFilteringType) {
    case 'recommendation':
      return <ThumbsUpIcon className={iconClass} />;
    case 'blame':
      return <ThumbsDownIcon className={iconClass} />;
    case 'question':
      return <AtomIcon className={iconClass} />;
    case 'caution':
      return <SignalIcon className={iconClass} />;
    case 'help':
      return <MagicWandIcon className={iconClass} />;
    default:
      return <ThumbsUpIcon className={iconClass} />;
  }
}

export default function CategoryFiltering({
  categoryFilteringType = 'recommendation',
  title = '추천',
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
      className={cx('background', { [`button-clicked-color-${categoryFilteringType}`]: isCategoryClicked })}
    >
      <div className={cx('svg-box')}>{selectedIcon(categoryFilteringType)}</div>
      <span className={cx('title', { [`button-clicked-color-${categoryFilteringType}`]: isCategoryClicked })}>
        {title}
      </span>
      <ChevronRightIcon
        onClick={handleClickArrow}
        className={cx('chevron-right-icon', {
          rotate: isCategoryClicked && isArrowClicked,
          [`button-clicked-color-${categoryFilteringType}`]: isCategoryClicked,
        })}
      />
    </button>
  );
}
