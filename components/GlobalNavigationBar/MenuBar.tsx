'use client';

import React, { useEffect } from 'react';

import MyPageIcon from '@icons/user-24.svg?component';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useNotificationStore } from '@stores/useNotificationStore';
import { useUserStore } from '@stores/userStore';

import NotificationIcon from '@components/GlobalNavigationBar/NotificationIcon';

import usePolling from '@hooks/usePolling';

import styles from './MenuBar.module.scss';

export default function MenuBar() {
  // 새알림 여부 확인
  usePolling();

  const { toggleModal, setCurrentName } = useModalStore();
  const { isSignin } = useUserStore();
  const { hasNewNotification, setHasNewNotification } = useNotificationStore();

  function handleClickNotificationIcon(name: ModalName) {
    setCurrentName(name);
    toggleModal();
    setHasNewNotification(false);
  }

  function handleClickMyPageIcon(name: ModalName) {
    setCurrentName(name);
    toggleModal();
    setHasNewNotification(false);
  }

  useEffect(() => {
    if (isSignin && hasNewNotification) {
      console.log('새로운 알림이 있습니다!');
    }
  }, [hasNewNotification, isSignin]);

  return (
    <div className={styles.align}>
      <NotificationIcon
        hasNewNotification={hasNewNotification}
        onClick={() => handleClickNotificationIcon('showNotification')}
      />
      <MyPageIcon onClick={() => handleClickMyPageIcon('showProfileDetail')} style={{ cursor: 'pointer' }} />
    </div>
  );
}
