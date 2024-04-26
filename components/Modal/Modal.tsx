import React from 'react';

import useModalStore from '@stores/useModalStore';

import Portal from '@components/Portal';

import styles from './Modal.module.scss';

export default function Modal({ children }: React.PropsWithChildren) {
  const { isOpen } = useModalStore();

  return (
    isOpen && (
      <Portal>
        <div className={styles.overlay}>
          <div className={styles.modal}>{children}</div>
        </div>
      </Portal>
    )
  );
}

function ModalHeader({ children }: React.PropsWithChildren) {
  return <div className={styles.header}>{children}</div>;
}

function ModalBody({ children }: React.PropsWithChildren) {
  return <div className={styles.body}>{children}</div>;
}

function ModalFooter({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
