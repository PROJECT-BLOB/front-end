import useModalStore from '@stores/useBlobModalStore';

import styles from './ModalContainer.module.scss';
import ReadModal from './ReadModal/ReadModal';

export default function ModalContainer() {
  const { show } = useModalStore();

  return (
    show && (
      <>
        <div className={styles['back-drop']} />
        <ReadModal />
      </>
    )
  );
}
