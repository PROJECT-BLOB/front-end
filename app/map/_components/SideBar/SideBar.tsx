import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import arrowRight from '@public/icons/chevron-right.svg';
import { useGetSidebarItems } from '@queries/useBlobmapQueries';
import { useMapStore } from '@stores/useMapStore';

import CtaComponent from '@components/CtaComponent/CtaComponent';

import Order from './Order';
import PostList from './Post/PostList';
import styles from './SideBar.module.scss';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const lastBound = useMapStore((state) => state.lastBound);
  const [order, setOrder] = useState<'recent' | 'hot'>('recent');
  // 카테고리
  const { data, refetch } = useGetSidebarItems('QUESTION,HELP', lastBound, 0, 100, order);
  const sideBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [sideBarRef]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  return (
    <div className={`${styles['side-bar']} ${isOpen ? styles.open : ''}`} ref={sideBarRef}>
      <button
        type='button'
        className={`${styles['arrow-wrapper']} ${isOpen ? '' : styles.close}`}
        onClick={() => setIsOpen(!isOpen)}
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
