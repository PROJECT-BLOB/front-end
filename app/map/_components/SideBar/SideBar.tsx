import Image from 'next/image';

import line from '@public/icons/line-horizontal.svg';
import xClose from '@public/icons/x-close.svg';

import styles from './SideBar.module.scss';
import useControlBottomSheet from '../../_hooks/useControlBottomSheet';

export default function SideBar() {
  const { handleTouchMove, handleTouchEnd, handleClickClose, handleClickSheet, sheetStyle } = useControlBottomSheet();

  return (
    <div className={styles['side-bar']} style={sheetStyle}>
      <div className={styles['top-line']} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <button type='button' onClick={handleClickSheet}>
          <Image src={line} alt='line' />
        </button>
      </div>
      <header className={styles.header}>
        <b className={styles.mention}>전체 n개 Blob 보기</b>
        <button type='button' onClick={handleClickClose}>
          <Image src={xClose} alt='closeIcon' width={24} height={24} />
        </button>
      </header>
    </div>
  );
}
