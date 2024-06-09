import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import arrowRight from '@public/icons/chevron-right.svg';
import { useGetSidebarItems } from '@queries/useBlobmapQueries';
import { useCategoryStore } from '@stores/useCategoryStore';
import { useMapStore } from '@stores/useMapStore';
import useModalStore from '@stores/useModalStore';

import CtaComponent from '@components/CtaComponent/CtaComponent';

import Order from './Order';
import PostList from './Post/PostList';
import styles from './SideBar.module.scss';

export default function SideBar() {
  const { isOpen } = useModalStore();
  const [isSideOpen, setIsSideOpen] = useState(false);
  const lastBound = useMapStore((state) => state.lastBound);
  const [order, setOrder] = useState<'recent' | 'hot'>('recent');
  // 카테고리
  const categoryString = useCategoryStore((state) => state.getCategoryString());
  const { data, refetch } = useGetSidebarItems(categoryString, lastBound, 0, 100, order);
  const sideBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        setIsSideOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    //
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [sideBarRef]);

  useEffect(() => {
    refetch();
  }, [order, lastBound, categoryString]);

  // 뒷배경 스크롤 방지
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <div className={`${styles['side-bar']} ${isSideOpen ? styles.open : ''}`} ref={sideBarRef}>
      <button
        type='button'
        className={`${styles['arrow-wrapper']} ${isSideOpen ? '' : styles.close}`}
        onClick={() => setIsSideOpen(!isSideOpen)}
      >
        <Image src={arrowRight} alt='arrow-right' width={32} height={40} />
      </button>
      <header className={styles.header}>
        <div className={styles.count}>
          <b className={styles.mention}>총 {data?.data.count}개의 BLOB이 있습니다.</b>
        </div>
      </header>
      {data?.data.count ? (
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
