import { useState } from 'react';

import classNames from 'classnames/bind';

import MiniMapSearch from '@/app/map/_components/Map/MiniMap';

import Checkbox from '@components/Checkbox/Checkbox';

import styles from './PositionDetail.module.scss';

const cx = classNames.bind(styles);

export default function PositionDetail() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <div className={cx('positiondetail-wrapper', { expanded: isChecked })}>
      <div className={cx('minimap-wrapper')}>
        <div className={cx('minimap-title')}>
          <p className={cx('title')}>자세히 입력하기</p>
          <p className={cx('sub-title')}>버튼을 누르면 미니맵이 나타납니다.</p>
        </div>
        <Checkbox value='someValue' checkedItemHandler={handleCheckboxChange} />
      </div>
      {isChecked && <MiniMapSearch />}
    </div>
  );
}
