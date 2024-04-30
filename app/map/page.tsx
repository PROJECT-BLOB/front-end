'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import ReadPost from '@components/Modal/ReadPost/ReadPost';
import WritePost from '@components/Modal/WritePost/WritePost';

export default function Map() {
  const { toggleModal, name, setCurrentName } = useModalStore();

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
      {name === 'write' ? <WritePost /> : <ReadPost />}
    </>
  );
}
