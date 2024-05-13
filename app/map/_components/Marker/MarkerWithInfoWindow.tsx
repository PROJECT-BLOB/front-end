import React, { useEffect, useRef, useState } from 'react';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import Marker, { MarkerProps } from '@/app/map/_components/Marker/Marker';
import MarkerHighlight, { MarkerHighlightProps } from '@/app/map/_components/Marker/MarkerHighlight';

import LatLngLiteral = google.maps.LatLngLiteral;

type MarkerWithInfoWindowProps = MarkerProps &
  MarkerHighlightProps & {
    position: LatLngLiteral;
  };

export default function MarkerWithInfoWindow({
  markerType,
  opacity,
  createdAt,
  title,
  position,
}: MarkerWithInfoWindowProps) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (markerRef.current && !markerRef.current.contains(event.target as Node)) {
        setIsInfoWindowOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [markerRef]);

  return (
    <>
      <AdvancedMarker onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)} position={position}>
        <div className='postion-fixer'>
          {isInfoWindowOpen && <MarkerHighlight markerType={markerType} title={title} createdAt={createdAt} />}
          <Marker markerType={markerType} opacity={opacity} markerRef={markerRef} />
        </div>
      </AdvancedMarker>
    </>
  );
}
