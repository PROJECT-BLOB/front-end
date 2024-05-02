import useModalStore from '@stores/useModalStore';

import styles from './CloseHeader.module.scss';

export default function CloseHeader() {
  const { toggleModal } = useModalStore();

  return (
    <div className={styles.closeHeader}>
      <span>글쓰기</span>
      <button type='button' className={styles.closeButton} onClick={toggleModal}>
        X
      </button>
    </div>
  );
}
