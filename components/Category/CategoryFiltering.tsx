import { useState } from 'react';

import classNames from 'classnames/bind';

import AtomIcon from '@public/icons/atom-02.svg';
import ChevronRightIcon from '@public/icons/chevron-right.svg';
import MagicWandIcon from '@public/icons/magic-wand-02-2.svg';
import SignalIcon from '@public/icons/signal-02-2.svg';
import ThumbsDownIcon from '@public/icons/thumbs-down-orange.svg';
import ThumbsUpIcon from '@public/icons/thumbs-up-red.svg';

import styles from './CategoryFiltering.module.scss';

const cx = classNames.bind(styles);

type CategoryFilteringType = 'recommendation' | 'blame' | 'question' | 'caution' | 'help';

export interface CategoryFilteringProps {
  categoryFilteringType: CategoryFilteringType;
  title: string;
}

function SelectedIcon(categoryFilteringType: CategoryFilteringType) {
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
  const [isClicked, setIsClicked] = useState(false);

  const handleClickCategory = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      type='button'
      onClick={handleClickCategory}
      className={cx('background', { [`button-clicked-color-${categoryFilteringType}`]: isClicked })}
    >
      <div className={cx('svg-box')}>{SelectedIcon(categoryFilteringType)}</div>
      <span className={cx('title', { [`button-clicked-color-${categoryFilteringType}`]: isClicked })}>{title}</span>
      <ChevronRightIcon
        className={cx('chevron-right-icon', { [`button-clicked-color-${categoryFilteringType}`]: isClicked })}
      />
    </button>
  );
}
