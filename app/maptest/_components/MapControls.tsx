import React from 'react';

import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';

import CreatePostButton from '@components/Button/CreatePostButton';

export default function MapControls() {
  return (
    <>
      <MapControl position={ControlPosition.BLOCK_START_INLINE_CENTER}>
        <div style={{ width: '70rem', background: 'purple', height: '10rem' }}>필터영역입니다.</div>
      </MapControl>
      <MapControl position={ControlPosition.INLINE_END_BLOCK_END}>
        <CreatePostButton />
      </MapControl>
    </>
  );
}
