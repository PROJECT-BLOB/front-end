'use client';

import React from 'react';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SeparateLine from '@icons/line-79.svg?component';

import styles from './TabItem.module.scss';

interface TabItemProps {
  label: string;
  href: string;
  isFirstChild?: boolean;
}

export default function TabItem({ label, href, isFirstChild = false }: TabItemProps) {
  const currentPath = usePathname().toLowerCase();
  const isCurrentTab = href.toLowerCase() === currentPath;
  const cx = classNames.bind(styles);

  return (
    <div className={cx('align')}>
      {!isFirstChild && <SeparateLine />}
      <Link className={cx(`tab`, `${isCurrentTab ? 'selected' : ''}`)} href={href}>
        {label}
      </Link>
    </div>
  );
}
