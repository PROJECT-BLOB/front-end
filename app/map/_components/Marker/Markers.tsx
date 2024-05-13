import React from 'react';

import MarkerWithInfoWindow from '@/app/map/_components/Marker/MarkerWithInfoWindow';
import trees from '@/app/map/_mock/trees';

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
        <MarkerWithInfoWindow
          key={`${location.lat}_${location.lng}`} // key값은 id
          title={location.name} // 제목으로
          position={{ lat: location.lat, lng: location.lng }} // 좌표
          createdAt={'3시간전'} // 생성 시간 변경
          markerType='recommendation' // 마커 타입 변경
        />
      ))}
    </>
  );
}
