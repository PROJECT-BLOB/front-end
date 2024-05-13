import * as process from 'process';

import React, { useEffect } from 'react';

import { APIProvider, ControlPosition, Map, MapControl, MapEvent } from '@vis.gl/react-google-maps';

import Autocomplete from '@/app/map/_components/Autocomplete/Autocomplete';
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

  useEffect(() => {}, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''} libraries={['marker']}>
      <Autocomplete />
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
  );
}
