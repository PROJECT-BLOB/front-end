'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import ReadPost from '@components/Modal/ReadPost/ReadPost';
import WritePost from '@components/Modal/WritePost/WritePost';
import Tab from '@components/Tab';

export default function Map() {
  const { toggleModal, name, setCurrentName } = useModalStore();

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  return (
    <>
      <h2>Map 페이지</h2>
      <Tab isClicked={false}>탭 요</Tab>
      <Tab isClicked>선택 탭 요</Tab>
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
