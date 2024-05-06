/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';

// import classNames from 'classnames/bind';

import Tab from '@components/Tab';

// import styles from './TabItem.module.scss';

interface TabItemProps {
  label?: string;
  value: string;
  isFocused: boolean;
  onClick?: (label: string) => void;
}
// const cx = classNames.bind(styles);

export default function TabItem({ label, value, isFocused, onClick }: TabItemProps) {
  const handleClick = (e: any) => {
    console.log('clicked', e.target.innerText);

    if (onClick) {
      onClick(e.target.innerText || '');
    }
  };

  return (
    <div onClick={handleClick}>
      <Tab focused={isFocused}>{value}</Tab>
    </div>
  );
}
