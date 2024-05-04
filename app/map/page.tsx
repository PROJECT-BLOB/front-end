'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import Button from '@components/Button/BlobButton';
import Modal from '@components/Modal/Modal';

export default function Map() {
  const { toggleModal, setCurrentName } = useModalStore();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  // 여러곳에서 뜰 수도 있음
  // 모달 여러개일 시 namelist

  return (
    <>
      <h2>Map 페이지</h2>
      <button type='button' onClick={() => handleClickModal('write')}>
        작성하기
      </button>
      <hr />
      <button type='button' onClick={() => handleClickModal('read')}>
        읽기
      </button>
      <Button text='BLOB' type='button' color='button-colord-contain' onClick={() => handleClickModal('write')} />
      <Button text='BLOB' type='button' color='button-colord-outlined' onClick={() => handleClickModal('write')} />
      <Button text='BLOB' type='button' color='button-gray-contain' onClick={() => handleClickModal('write')} />
      <Button text='취소' type='button' color='button-gray-outlined' onClick={() => handleClickModal('write')} />

      <Modal />
    </>
  );
}
