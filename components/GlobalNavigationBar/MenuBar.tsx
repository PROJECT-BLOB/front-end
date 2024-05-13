'use client';

import React from 'react';

import MyPageIcon from '@icons/user-24.svg?component';
import useModalStore, { ModalName } from '@stores/useModalStore';

import NotificationIcon from '@components/GlobalNavigationBar/NotificationIcon';

import styles from './MenuBar.module.scss';

export default function MenuBar() {
  // TODO: 알림을 전역상태로 관리- 새 알림이 생겼는지 여부 확인
  const { toggleModal, setCurrentName } = useModalStore();

  function handleClickNotificationIcon(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  const handleClickMyPageIcon = () => {};

  return (
    <div className={styles.align}>
      <NotificationIcon hasNewNotification={false} onClick={() => handleClickNotificationIcon('showNotification')} />
      <MyPageIcon onClick={handleClickMyPageIcon} />
    </div>
  );
}
