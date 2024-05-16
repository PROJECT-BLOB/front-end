import * as process from 'process';

import React from 'react';

import { APIProvider, ControlPosition, Map, MapControl, MapEvent } from '@vis.gl/react-google-maps';
import classNames from 'classnames/bind';
import Image from 'next/image';

import MapHandler from '@/app/map/_components/Map/MapHandler';
import Marker from '@/app/map/_components/Marker/Marker';
import { MINI_MAP_STYLES } from '@/app/map/_constants/mapOptions';
import target from '@public/icons/target-03-1.svg';
import { useMapStore } from '@stores/useMapStore';

import style from './MapTest.module.scss';
import styles from './MiniMap.module.scss';

const cx = classNames.bind(styles);

export default function MiniMap() {
  const lastMapCenter = useMapStore((state) => state.lastMapCenter);
  const setLastMapCenter = useMapStore((state) => state.setLastMapCenter);

  const handleDragMap = (event: MapEvent) => {
    const newLocation = event.map.getCenter()?.toJSON();
    setLastMapCenter(newLocation);
  };
  const [, setButtonClicked] = React.useState(false); // 버튼 클릭 여부 상태 추가

  const { setCurrentPosition } = useMapStore();

  const getCurrentPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          console.log('현재 위치:', latitude, longitude);
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

  return (
    <div className={cx('minimap-wrapper')}>
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
      <button type='button' onClick={handleGetCurrentPosition} className={cx('current-location-button')}>
        <Image src={target} width={16} height={16} alt='target' />
        현재 내 위치
      </button>
    </div>
  );
}
