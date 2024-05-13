import React, { useEffect, useRef, useState } from 'react';

import Marker, { MarkerProps } from '@/app/map/_components/Marker/Marker';
import MarkerHighlight, { MarkerHighlightProps } from '@/app/map/_components/Marker/MarkerHighlight';

type MarkerWithInfoWindowProps = Omit<MarkerProps, 'markerRef'> & MarkerHighlightProps;

export default function MarkerWithInfoWindow({ markerType, opacity, createdAt, title }: MarkerWithInfoWindowProps) {
    
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
      {
        // eslint-disable-next-line
        <div onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}>
          <div className='postion-fixer'>
            {isInfoWindowOpen && <MarkerHighlight markerType={markerType} title={title} createdAt={createdAt} />}
            <Marker markerType={markerType} opacity={opacity} markerRef={markerRef} />
          </div>
        </div>
      }
    </>
  );
}
