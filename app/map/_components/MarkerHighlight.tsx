import { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import { MarkerType } from '@/app/map/_components/Marker';
import PolygonIcon from '@icons/polygon-1.svg?component';

import styles from './MarkerHighlight.module.scss';

const cx = classNames.bind(styles);

interface MarkerHighlightProps {
  markerType: MarkerType;
  title: string;
  createdAt: string;
}

export default function MarkerHighlight({
  markerType = 'recommendation',
  title = '제목이 없습니다.',
  createdAt,
  children,
}: PropsWithChildren<MarkerHighlightProps>) {
  return (
    <div className={cx('component')}>
      <div className={cx(`wrapper`, `color-${markerType}`)}>
        <div className={cx('align-div')}>
          <header className={cx('align-header')}>
            <h2 className={cx('title')}>{title}</h2>
            <p className={cx('created-at')}>{createdAt}</p>
          </header>
          <p className={cx('content')}>{children}</p>
        </div>
      </div>
      <PolygonIcon className={cx('svg', `color-${markerType}`)} />
    </div>
  );
}
