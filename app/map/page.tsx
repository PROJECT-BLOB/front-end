'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import ReadPost from '@components/Modal/ReadPost/ReadPost';
import WritePost from '@components/Modal/WritePost/WritePost';

export default function Map() {
  const { toggleModal, name, setName } = useModalStore();

  function handleModalClick(name: ModalName) {
    setName(name);
    toggleModal();
  }

  return (
    <>
      <h2>Map 페이지</h2>
      <button type='button' onClick={() => handleModalClick('write')}>
        작성하기
      </button>
      <hr />
      <button type='button' onClick={() => handleModalClick('read')}>
        읽기
      </button>
      {name === 'write' && <WritePost />}
      {name === 'read' && <ReadPost />}
    </>
  );
}
