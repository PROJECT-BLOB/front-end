import React from 'react';

import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';

import useModalStore, { ModalName } from '@stores/useModalStore';

import CreatePostButton from '@components/Button/CreatePostButton';

export default function MapControlComponents() {
  const { toggleModal, setCurrentName } = useModalStore();
  const MODAL_NAME = 'write';

  function handleClickModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  return (
    <>
      <MapControl position={ControlPosition.BLOCK_START_INLINE_CENTER}>
        <div style={{ width: '70rem', background: 'purple', height: '10rem' }}>필터영역입니다.</div>
      </MapControl>
      <MapControl position={ControlPosition.INLINE_END_BLOCK_END}>
        <CreatePostButton onClick={() => handleClickModal(MODAL_NAME)} />
      </MapControl>
    </>
  );
}
