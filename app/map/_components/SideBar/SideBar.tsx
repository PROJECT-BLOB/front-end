import { useState } from 'react';

import Image from 'next/image';

import line from '@public/icons/line-horizontal.svg';
import xClose from '@public/icons/x-close.svg';

import PostList from '@components/Post/PostList';

import styles from './SideBar.module.scss';
import useControlBottomSheet from '../../_hooks/useControlBottomSheet';

export default function SideBar() {
  const { handleTouchMove, handleTouchEnd, handleClickClose, handleClickSheet, sheetStyle } = useControlBottomSheet();
  const [isClicked, setIsClicked] = useState({ recent: true, hot: false });

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
      <div className={styles['order-wrapper']}>
        <button
          className={`${styles['order-mention']} ${isClicked.recent ? styles.active : ''} `}
          type='button'
          onClick={() => setIsClicked(() => ({ recent: true, hot: false }))}
        >
          최신순
        </button>
        <span className={styles['order-mention']}>|</span>
        <button
          className={`${styles['order-mention']} ${isClicked.hot ? styles.active : ''} `}
          type='button'
          onClick={() => setIsClicked(() => ({ recent: false, hot: true }))}
        >
          인기순
        </button>
      </div>
      <PostList />
    </div>
  );
}
