import React from 'react';

import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';

import Filter from '@/app/map/_components/Map/Filter';
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
        <Filter />
      </MapControl>
      <MapControl position={ControlPosition.INLINE_END_BLOCK_END}>
        <CreatePostButton onClick={() => handleClickModal(MODAL_NAME)} />
      </MapControl>
    </>
  );
}
