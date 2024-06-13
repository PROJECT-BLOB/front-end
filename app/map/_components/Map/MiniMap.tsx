import * as process from 'process';

import React, { useEffect } from 'react';

import { APIProvider, ControlPosition, Map, MapControl, MapEvent } from '@vis.gl/react-google-maps';
import classNames from 'classnames/bind';

import MapHandler from '@/app/map/_components/Map/MapHandler';
import Marker from '@/app/map/_components/Marker/Marker';
import { MINI_MAP_STYLES } from '@/app/map/_constants/mapOptions';
import { useMapStore } from '@stores/useMapStore';

import Checkbox from '@components/Checkbox/Checkbox';

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
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);

  const getCurrentPosition = (checked: boolean) => {
    if (checked) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting current position', error);
          },
        );
      } else {
        console.error('Geolocation is not available');
      }
    } else {
      setCurrentPosition(null);
    }
  };

  const handleGetCurrentPosition = (value: string, isChecked: boolean) => {
    getCurrentPosition(isChecked); // getCurrentPosition 호출
  };

  useEffect(() => {}, []);

  return (
    <div className={cx('minimap-wrapper')}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''} libraries={['marker']}>
        <div className={style['map-container']}>
          <Map
            defaultCenter={lastMapCenter}
            defaultZoom={17}
            style={MINI_MAP_STYLES}
            maxZoom={17}
            minZoom={17}
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
      <label className={cx('current-location-button')}>
        <Checkbox value='' checkedItemHandler={handleGetCurrentPosition} />
        {/* <Image src={target} width={16} height={16} alt='target' /> */}내 위치 제공
      </label>
    </div>
  );
}
