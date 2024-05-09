'use client';

import React from 'react';

import MyPageIcon from '@icons/user-24.svg?component';

import AlarmIcon from '@components/GlobalNavigationBar/AlarmIcon';

import styles from './MenuBar.module.scss';

export default function MenuBar() {
  const handleClickAlarmIcon = () => {};
  const handleClickMyPageIcon = () => {};

  return (
    <div className={styles.align}>
      <AlarmIcon hasNewAlarm={false} onClick={handleClickAlarmIcon} />
      <MyPageIcon onClick={handleClickMyPageIcon} />
    </div>
  );
}
