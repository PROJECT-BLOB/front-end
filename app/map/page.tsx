'use client';

import React from 'react';

import LiveMapGoogleMap from '@/app/maptest/LiveMapGoogleMap';
import useModalStore from '@stores/useModalStore';

import ModalContainer from './_components/Modal/ModalContainer';

export default function Map() {
  const { toggleModal } = useModalStore();

  return (
    <>
      <h2>Map 페이지</h2>
      <button type='button' onClick={toggleModal}>
        작성하기
      </button>
      <ModalContainer />
    </>
  );
}
