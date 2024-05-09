import React from 'react';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import Marker from '@/app/map/_components/Marker';
import trees from '@/app/maptest/_mock/trees';

export default function Markers() {
  // 위치 정보를 변수에 저장한다.s
  // interface location {
  //   lat: number;
  //   lng: number;
  //   name?: string;
  // }
  const locations = trees;

  return (
    <>
      {locations.map((location) => (
        <AdvancedMarker
          // animation={google.maps.Animation.BOUNCE}
          key={`${location.lat}_${location.lng}`}
          title={location.name}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => console.log('MarkerClicked')}
        >
          <Marker />
        </AdvancedMarker>
      ))}
    </>
  );
}
