import { useEffect, useState } from 'react';

import Image from 'next/image';

import arrowDown from '@public/icons/chevron-down.svg';
import line from '@public/icons/line-horizontal.svg';
import xClose from '@public/icons/x-close.svg';
import { useGetSidebarItems } from '@queries/useBlobmapQueries';
import { useCategoryStore } from '@stores/useCategoryStore';
import { useMapStore } from '@stores/useMapStore';

import CtaComponent from '@components/CtaComponent/CtaComponent';

import styles from './BottomSheet.module.scss';
import Order from './Order';
import PostList from './Post/PostList';
import useControlBottomSheet from '../../_hooks/useControlBottomSheet';

export default function BottomSheet() {
  const { handleTouchMove, handleTouchEnd, handleClickClose, handleClickSheet, sheetStyle } = useControlBottomSheet();

  const lastBound = useMapStore((state) => state.lastBound);
  const [order, setOrder] = useState<'recent' | 'hot'>('recent');
  const categoryString = useCategoryStore((state) => state.getCategoryString());

  const { data, refetch } = useGetSidebarItems(categoryString, lastBound, 0, 100, 'recent');

  useEffect(() => {
    refetch();
  }, [order, categoryString, lastBound]);

  return (
    <div className={styles['bottom-sheet']} style={sheetStyle}>
      <div className={styles['top-line']} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <button type='button' onClick={handleClickSheet}>
          <Image src={line} alt='line' />
        </button>
      </div>
      <header className={styles.header}>
        <div className={styles.count}>
          <Image src={arrowDown} alt='arrow' />
          <b className={styles.mention}>전체 {data?.data.count}개 Blob 보기</b>
        </div>
        <button type='button' onClick={handleClickClose}>
          <Image src={xClose} alt='closeIcon' width={24} height={24} />
        </button>
      </header>
      {data?.data ? (
        <>
          <Order setOrder={setOrder} />
          <PostList />
        </>
      ) : (
        <CtaComponent isSidebar />
      )}
    </div>
  );
}
