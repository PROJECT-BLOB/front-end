import AtomIcon from '@icons/atom-01.svg?component';
import MagicWandIcon from '@icons/magic-wand-02.svg?component';
import SignalIcon from '@icons/signal-02.svg?component';
import ThumbDownIcon from '@icons/thumbs-down.svg?component';
import ThumbsUpIcon from '@icons/thumbs-up.svg?component';
import classNames from 'classnames/bind';

import styles from './Marker.module.scss';

const cx = classNames.bind(styles);

export type MarkerType = 'recommendation' | 'blame' | 'question' | 'caution' | 'help';

interface MarkerProps {
  markerType: MarkerType;
  // TODO: opacity는 향후 도메인 로직으로 교체하여 시간에따라 변경될 수 있게 한다.
  opacity?: 25 | 50 | 75 | 100;
}

export default function Marker({ markerType = 'recommendation', opacity = 100 }: MarkerProps) {
  const SelectedIcon = (markerType: MarkerType) => {
    switch (markerType) {
      case 'recommendation':
        return <ThumbsUpIcon className={cx('svg', 'thin')} />;
      case 'blame':
        return <ThumbDownIcon className={cx('svg', 'thin')} />;
      case 'question':
        return <AtomIcon className={cx('svg')} />;
      case 'caution':
        return <SignalIcon className={cx('svg')} />;
      case 'help':
        return <MagicWandIcon className={cx('svg')} />;
      default:
        return <SignalIcon className={cx('svg')} />;
    }
  };

  return (
    <div className={cx('background', `color-${markerType}`, `opacity-${opacity}`)}>{SelectedIcon(markerType)}</div>
  );
}
