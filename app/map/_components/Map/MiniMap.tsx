import * as process from 'process';

import React, { useEffect } from 'react';

import { APIProvider, ControlPosition, Map, MapControl, MapEvent } from '@vis.gl/react-google-maps';

import MapHandler from '@/app/map/_components/Map/MapHandler';
import Marker from '@/app/map/_components/Marker/Marker';
import { MINI_MAP_STYLES } from '@/app/map/_constants/mapOptions';
import { useMapStore } from '@stores/useMapStore';

import style from './MapTest.module.scss';

export default function MiniMap() {
  const lastMapCenter = useMapStore((state) => state.lastMapCenter);
  const setLastMapCenter = useMapStore((state) => state.setLastMapCenter);

  const handleDragMap = (event: MapEvent) => {
    const newLocation = event.map.getCenter()?.toJSON();
    setLastMapCenter(newLocation);
  };
  const [, setSelectedCity] = React.useState<{ cityName: string; lat: number; lng: number } | null>(null);
  const [, setButtonClicked] = React.useState(false); // 버튼 클릭 여부 상태 추가

  const getCurrentPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedCity({ cityName: '현재 위치', lat: latitude, lng: longitude });
          console.log('현재 위치', latitude, longitude);
        },
        (error) => {
          console.error('Error getting current position', error);
        },
      );
    } else {
      console.error('Geolocation is not available');
    }
  };

  const handleGetCurrentPosition = () => {
    setButtonClicked(true); // 버튼 클릭됨을 상태에 저장
    getCurrentPosition(); // getCurrentPosition 호출
  };

  useEffect(() => {}, []);

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''} libraries={['marker']}>
        <div className={style['map-container']}>
          <Map
            defaultCenter={lastMapCenter}
            defaultZoom={14}
            style={MINI_MAP_STYLES}
            maxZoom={14}
            minZoom={14}
            disableDefaultUI
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
            onDrag={handleDragMap}
          />
        </div>
        <MapHandler />
        <MapControl position={ControlPosition.CENTER}>
          <Marker />
        </MapControl>
      </APIProvider>
      <button
        type='button'
        onClick={handleGetCurrentPosition}
        style={{ width: '20px', height: '20px', background: 'red' }}
      />
    </div>
  );
}
