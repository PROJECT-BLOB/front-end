'use client';

import FilterModal from '@/app/feed/_components/FilterModal/FilterModal';
import UpdateProfileModal from '@/app/mypage/_components/UpdateProfileModal/UpdateProfileModal';
import RegisterModal from '@/app/signin/_components/RegisterModal/RegisterModal';
import useModalStore, { ModalName } from '@stores/useModalStore';

import NotificationModal from '@components/GlobalNavigationBar/NotificationModal/NotificationModal';
import ProfileModal from '@components/GlobalNavigationBar/ProfileModal/ProfileModal';
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
  filtering: <FilterModal />,
  showNotification: <NotificationModal />,
  showProfileDetail: <ProfileModal />,
};

export default function ModalContainer() {
  const { isOpen, name } = useModalStore();

  // 뒷배경 스크롤 방지
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
