import useModalStore from '@stores/useModalStore';

import Portal from '@components/Portal';

import styles from './Modal.module.scss';

export default function Modal({ children }: React.PropsWithChildren) {
  const { isOpen } = useModalStore();

  return (
    isOpen && (
      <Portal>
        <div className={styles['back-drop']} />
        <div className={styles.modal}>{children}</div>
      </Portal>
    )
  );
}

function ModalHeader({ children }: React.PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}

function ModalBody({ children }: React.PropsWithChildren) {
  return <div className={styles.content}>{children}</div>;
}

function ModalFooter({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
