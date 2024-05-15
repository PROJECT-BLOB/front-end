import { useState } from 'react';

import Image from 'next/image';

import arrowRight from '@public/icons/chevron-right.svg';

import Order from './Order';
import PostList from './Post/PostList';
import styles from './SideBar.module.scss';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles['side-bar']} ${isOpen ? styles.open : ''}`}>
      <button
        type='button'
        className={`${styles['arrow-wrapper']} ${isOpen ? '' : styles.close}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={arrowRight} alt='arrow-right' width={32} height={40} />
      </button>
      <header className={styles.header}>
        <div className={styles.count}>
          <b className={styles.mention}>총 n개의 BLOB이 있습니다.</b>
        </div>
      </header>
      <Order />
      <PostList />
    </div>
  );
}
