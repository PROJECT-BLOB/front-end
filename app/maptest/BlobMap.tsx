import React from 'react';

import { Map } from '@vis.gl/react-google-maps';

import MapControlComponents from '@/app/maptest/_components/MapControls';
import AutocompleteHandler from '@/app/maptest/_components/MapHandler';
import { DEFAULT_STYLES_NORMAL } from '@/app/maptest/_constants/mapOptions';
import Markers from '@/app/maptest/Markers';

import style from './MapTest.module.scss';

interface BlobMapProps {
  initialPosition: google.maps.LatLngLiteral;
  currentPosition: google.maps.LatLngLiteral | null;
  previousPosition: google.maps.LatLngLiteral | null;
  setPreviousPosition: (position: google.maps.LatLngLiteral) => void;
}

export default function BlobMap({
  initialPosition,
  currentPosition,
  previousPosition,
  setPreviousPosition,
}: BlobMapProps) {
  return (
    <div className={style['map-container']}>
      <Map
        defaultCenter={initialPosition}
        defaultZoom={10}
        style={DEFAULT_STYLES_NORMAL}
        minZoom={4}
        disableDefaultUI
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        <Markers />
        <MapControlComponents />
        <AutocompleteHandler
          currentPosition={currentPosition}
          previousPosition={previousPosition}
          setPreviousPosition={setPreviousPosition}
        />
      </Map>
    </div>
  );
}
