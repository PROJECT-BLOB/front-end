import { useEffect } from 'react';

import { useMap } from '@vis.gl/react-google-maps';

// props-> 상태로 변경예정
interface MapHandlerProps {
  currentPosition: google.maps.LatLngLiteral | null;
  previousPosition: google.maps.LatLngLiteral | null;
  setPreviousPosition: (position: google.maps.LatLngLiteral) => void;
}

export default function MapHandler({ currentPosition, previousPosition, setPreviousPosition }: MapHandlerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || !currentPosition || !previousPosition) return;

    const PADDING_ZOOM_OUT = 1000;
    const PADDING_ZOOM_IN = 300;

    // 지도에 보여줄 영역을 계산.
    function getBound(position: google.maps.LatLngLiteral) {
      return {
        east: position.lng + 0.5,
        west: position.lng - 0.5,
        north: position.lat + 0.2,
        south: position.lat - 0.2,
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

    // 현재 위치와 이전 위치를 비교하여 지도의 zoom in-out을 조정
    const CURRENT_BOUND = getBound(currentPosition);
    const PREVIOUS_BOUND = getBound(previousPosition);

    // 이전 위치에서 zoom-out
    map.fitBounds(PREVIOUS_BOUND, getPadding(PADDING_ZOOM_OUT));

    // 현재 위치로 카메라 이동
    setTimeout(() => {
      map.fitBounds(CURRENT_BOUND, getPadding(PADDING_ZOOM_OUT));
      setPreviousPosition(currentPosition);
    }, 1000);

    // 현재 위치에서 zoom-in
    setTimeout(() => {
      console.log('fitZoom');
      map.fitBounds(CURRENT_BOUND, getPadding(PADDING_ZOOM_IN));
      setPreviousPosition(currentPosition);
    }, 2000);
  }, [currentPosition, map]);

  return null;
}
