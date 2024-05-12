import Image from 'next/image';

import line from '@public/icons/line-horizontal.svg';
import xClose from '@public/icons/x-close.svg';

import styles from './SideBar.module.scss';

export default function SideBar() {
  return (
    <div className={styles['side-bar']}>
      <div className={styles['top-line']}>
        <Image src={line} alt='line' />
      </div>
      <header className={styles.header}>
        <b className={styles.mention}>전체 n개 Blob 보기</b>
        <Image src={xClose} alt='closeIcon' width={24} height={24} />
      </header>
    </div>
  );
}
