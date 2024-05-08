'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import styles from './Feed.module.scss';

export default function Feed() {
  const { toggleModal, setCurrentName } = useModalStore();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  return (
    <>
      <h1 className={styles.title}>피드 페이지</h1>
      <button type='button' onClick={() => handleClickModal('filtering')}>
        필터링
      </button>
    </>
  );
}
