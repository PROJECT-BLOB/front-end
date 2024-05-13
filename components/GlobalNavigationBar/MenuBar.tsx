'use client';

import React, { useEffect } from 'react';

import { UserDetail } from '@/types/User';
// import MyPageIcon from '@icons/user-24.svg?component';
import { useDetailQueries } from '@queries/useUserQueries';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useNotificationStore } from '@stores/useNotificationStore';
import { useUserStore } from '@stores/userStore';

import Avatar from '@components/Avatar/Avatar';
import NotificationIcon from '@components/GlobalNavigationBar/NotificationIcon';

import usePolling from '@hooks/usePolling';

import styles from './MenuBar.module.scss';

export default function MenuBar() {
  // 새알림 여부 확인
  usePolling();

  const { toggleModal, setCurrentName } = useModalStore();
  const { isSignin, blobId } = useUserStore();
  const { hasNewNotification, setHasNewNotification } = useNotificationStore();
  const { data } = useDetailQueries(blobId);
  const userData: UserDetail | undefined = data?.data;

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
      {/* //TODO: 여기서 hydration 관련 에러나서 일단 주석처리함.. 로그인 안 한 유저는 그냥 기본 이미지로 보여줘도 괜찮을지도 ? */}
      {/* {isSignin ? (
        <Avatar
          size='xsmall'
          imageSource={userData?.profileUrl || ''}
          onClick={() => handleClickMyPageIcon('showProfileDetail')}
        />
      ) : (
        <MyPageIcon onClick={() => handleClickMyPageIcon('showProfileDetail')} style={{ cursor: 'pointer' }} />
      )} */}
      <Avatar
        size='xsmall'
        imageSource={userData?.profileUrl || ''}
        onClick={() => handleClickMyPageIcon('showProfileDetail')}
      />
    </div>
  );
}
