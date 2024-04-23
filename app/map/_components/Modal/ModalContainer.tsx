import useModalStore from '@stores/useModalStore';

import styles from './ModalContainer.module.scss';
import WriteModal from './WritePost/WritePost';

export default function ModalContainer() {
  const { isOpen } = useModalStore();

  return (
    isOpen && (
      <>
        <div className={styles['back-drop']} />

        {/* <ModalHeader />
        <ModalBody target={target}/>
        <ModalFooter /> */}
        <WriteModal />
      </>
    )
  );
}
