'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import SideBar from './_components/SideBar/SideBar';

export default function Map() {
  const { toggleModal, setCurrentName } = useModalStore();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

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
      {/* <SideBar /> */}
    </>
  );
}
