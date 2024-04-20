'use client';

import useModalStore from '@stores/useBlobModalStore';

import Modal from './_components/Modal';

export default function Map() {
  const { toggleModal } = useModalStore();

  return (
    <h2>
      Map 페이지
      <button type='button' onClick={toggleModal}>
        작성하기
      </button>
      <Modal />
    </h2>
  );
}
