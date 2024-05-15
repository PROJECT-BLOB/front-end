'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { useDetailQueries } from '@queries/useUserQueries';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { useNotificationStore } from '@stores/useNotificationStore';
import { useUserStore } from '@stores/userStore';

import Avatar from '@components/Avatar/Avatar';
import BlobButton from '@components/Button/BlobButton';
import NotificationIcon from '@components/GlobalNavigationBar/NotificationIcon';

import usePolling from '@hooks/usePolling';

import styles from './MenuBar.module.scss';

export default function MenuBar() {
  const { toggleModal, setCurrentName } = useModalStore();
  const { isSignin, blobId, setBlobId, signin, isLoaded } = useUserStore();
  const { hasNewNotification, setHasNewNotification } = useNotificationStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedBlobId = localStorage.getItem('blobId') ?? '';
      const storedIsSignin = localStorage.getItem('isSignin') === 'true';

      setBlobId(storedBlobId);

      if (storedIsSignin) {
        signin();
      }
    }
  }, [setBlobId, signin]);

  const { data } = useDetailQueries(blobId);

  // 새알림 여부 확인
  usePolling();

  if (!isLoaded) return null;

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

  return (
    <>
      {isSignin ? (
        <div className={styles.align}>
          <NotificationIcon
            hasNewNotification={hasNewNotification}
            onClick={() => handleClickNotificationIcon('showNotification')}
          />
          <Avatar
            size='xsmall'
            imageSource={data?.data?.profileUrl || ''}
            onClick={() => handleClickMyPageIcon('showProfileDetail')}
          />
        </div>
      ) : (
        // 임의로 로그인 버튼 추가
        <Link className={styles.login} href={'/signin'}>
          <BlobButton text='로그인' type='button' color='button-colord-contain' />
        </Link>
      )}
    </>
  );
}
