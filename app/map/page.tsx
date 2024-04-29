'use client';

import useModalStore, { ModalName } from '@stores/useModalStore';

import Button from '@components/Button/BlobButton';
import ReadPost from '@components/Modal/ReadPost/ReadPost';
import WritePost from '@components/Modal/WritePost/WritePost';
import Tab from '@components/Tab';

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
      <Tab isClicked={false}>탭 요</Tab>
      <Tab isClicked>선택 탭 요</Tab>
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

      {name === 'write' ? <WritePost /> : <ReadPost />}
    </>
  );
}
