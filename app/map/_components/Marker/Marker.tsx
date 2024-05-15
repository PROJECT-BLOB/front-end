import classNames from 'classnames/bind';

import { Category } from '@apis/map/getMarkers';
import AtomIcon from '@icons/atom-01.svg?component';
import MagicWandIcon from '@icons/magic-wand-02.svg?component';
import SignalIcon from '@icons/signal-02.svg?component';
import ThumbDownIcon from '@icons/thumbs-down.svg?component';
import ThumbsUpIcon from '@icons/thumbs-up.svg?component';

import styles from './Marker.module.scss';

const cx = classNames.bind(styles);

export interface MarkerProps {
  markerType?: Category;
  // TODO: opacity는 향후 도메인 로직으로 교체하여 시간에따라 변경될 수 있게 한다.
  opacity?: 25 | 50 | 75 | 100;
  markerRef?: React.RefObject<HTMLDivElement>;
}

function SelectedIcon(markerType: Category) {
  switch (markerType) {
    case 'RECOMMENDED':
      return <ThumbsUpIcon className={cx('svg', 'thin')} />;
    case 'NOT_RECOMMENDED':
      return <ThumbDownIcon className={cx('svg', 'thin')} />;
    case 'QUESTION':
      return <AtomIcon className={cx('svg')} />;
    case 'WARNING':
      return <SignalIcon className={cx('svg')} />;
    case 'HELP':
      return <MagicWandIcon className={cx('svg')} />;
    default:
      return <SignalIcon className={cx('svg')} />;
  }
}

export default function Marker({ markerType = 'RECOMMENDED', opacity = 100, markerRef }: MarkerProps) {
  return (
    <div ref={markerRef} className={cx('background', `color-${markerType}`, `opacity-${opacity}`)}>
      {SelectedIcon(markerType)}
    </div>
  );
}

// export default forwardRef<HTMLDivElement, MarkerProps>(Marker, ref);
