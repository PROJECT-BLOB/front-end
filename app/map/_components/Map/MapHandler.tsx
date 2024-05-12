import { useEffect } from 'react';

import { useMap } from '@vis.gl/react-google-maps';

import { useMapStore } from '@stores/useMapStore';

export default function MapHandler() {
  const map = useMap();

  const mapState = useMapStore((state) => state);
  const { lastMapCenter, lastSearchCity } = mapState;

  // 지도에 보여줄 영역을 계산.
  function getBound(position: google.maps.LatLngLiteral) {
    if (!position) return;

    return {
      east: position.lng + 0.01,
      west: position.lng - 0.01,
      north: position.lat + 0.01,
      south: position.lat - 0.01,
    };
  }

  // 지도에 보여줄 영역을 계산(패딩).
  function getPadding(padding: number) {
    return {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
    };
  }

  // search city가 변경되면 지도의 중심을 변경
  useEffect(() => {
    if (!map || !lastSearchCity.location) return;

    console.log('lastSearchCity', lastSearchCity);

    const PADDING_ZOOM_OUT = 800;
    const PADDING_ZOOM_IN = 300;

    // 현재 위치와 이전 위치를 비교하여 지도의 zoom in-out을 조정
    const PREVIOUS_BOUND = getBound(lastMapCenter);
    const CURRENT_BOUND = getBound(lastSearchCity.location);

    // 이전 위치에서 zoom-out
    map.fitBounds(PREVIOUS_BOUND!, getPadding(PADDING_ZOOM_OUT));

    // 현재 위치로 카메라 이동
    setTimeout(() => {
      map.fitBounds(CURRENT_BOUND!, getPadding(PADDING_ZOOM_OUT));
    }, 500);

    // 현재 위치에서 zoom-in
    setTimeout(() => {
      map.fitBounds(CURRENT_BOUND!, getPadding(PADDING_ZOOM_IN));
    }, 1500);
  }, [lastSearchCity, map]);

  return null;
}
