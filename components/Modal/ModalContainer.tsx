'use client';

import FilteringModal from '@/app/feed/_components/FilteringModal/FilteringModal';
import UpdateProfileModal from '@/app/mypage/_components/UpdateProfileModal/UpdateProfileModal';
import RegisterModal from '@/app/signin/_components/RegisterModal/RegisterModal';
import useModalStore, { ModalName } from '@stores/useModalStore';

import Portal from '@components/Portal';

import styles from './ModalContainer.module.scss';
import ReadPost from './ReadPost/ReadPost';
import WritePost from './WritePost/WritePost';

// key 타입은 ModalName의 값, 값은 JSX.Element
const ModalList: { [key in ModalName]: JSX.Element } = {
  read: <ReadPost />,
  write: <WritePost />,
  registerUser: <RegisterModal />,
  updateProfile: <UpdateProfileModal />,
  filtering: <FilteringModal />,
};

export default function ModalContainer() {
  const { isOpen, name } = useModalStore();

  return (
    isOpen && (
      <Portal>
        <div className={styles['back-drop']} />
        {/* <div className={styles['modal-container']}>{ModalList[name]}</div> */}
        {/* 예진-빌드하면 에러 나서 임의로 수정했습니다ㅠㅠ */}
        <div className={styles['modal-container']}>{ModalList[name as keyof typeof ModalList]}</div>
      </Portal>
    )
  );
}
