import React from 'react';

import useModalStore from '@stores/useModalStore';

import Portal from '@components/Portal';

import CreateUser from './CreateUser/CreateUser';
import styles from './ModalContainer.module.scss';
import ReadPost from './ReadPost/ReadPost';
import WritePost from './WritePost/WritePost';

const ModalList = {
  read: <ReadPost />,
  write: <WritePost />,
  createUser: <CreateUser />,
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
