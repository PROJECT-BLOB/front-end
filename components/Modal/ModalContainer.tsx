'use client';

import FilteringModal from '@/app/feed/_components/FilteringModal/FilteringModal';
import UpdateProfileModal from '@/app/mypage/_components/UpdateProfileModal/UpdateProfileModal';
import RegisterModal from '@/app/signin/_components/RegisterModal/RegisterModal';
import useModalStore, { ModalName } from '@stores/useModalStore';

import NotificationModal from '@components/GlobalNavigationBar/NotificationModal/NotificationModal';
import Portal from '@components/Portal';

import styles from './ModalContainer.module.scss';
import WritePost from './WritePost/WritePost';
import ReadPost from '../../app/map/_components/ReadPostModal';

// key 타입은 ModalName의 값, 값은 JSX.Element
const ModalList: { [key in ModalName]: JSX.Element } = {
  read: <ReadPost />,
  write: <WritePost />,
  registerUser: <RegisterModal />,
  updateProfile: <UpdateProfileModal />,
  filtering: <FilteringModal />,
  showNotification: <NotificationModal />,
};

export default function ModalContainer() {
  const { isOpen, name } = useModalStore();

  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    isOpen && (
      <Portal>
        <div className={styles['back-drop']} />
        <div className={styles['modal-container']}>{ModalList[name as keyof typeof ModalList]}</div>
      </Portal>
    )
  );
}
