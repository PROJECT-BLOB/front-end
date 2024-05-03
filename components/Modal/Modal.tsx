import React from 'react';

import useModalStore from '@stores/useModalStore';

import Portal from '@components/Portal';

import CreateUser from './CreateUser/CreateUser';
import styles from './Modal.module.scss';
import ReadPost from './ReadPost/ReadPost';
import WritePost from './WritePost/WritePost';

const ModalList = {
  '': '',
  read: <ReadPost />,
  write: <WritePost />,
  createUser: <CreateUser />,
};

export default function Modal() {
  const { isOpen, name } = useModalStore();

  return (
    isOpen && (
      <Portal>
        <div className={styles['back-drop']} />
        <div className={styles['modal-container']}>{ModalList[name]}</div>
      </Portal>
    )
  );
}
