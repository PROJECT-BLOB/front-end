'use client';

import React, { useState } from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';

import Autocomplete from '@/app/maptest/Autocomplete';
import BlobMap from '@/app/maptest/BlobMap';

export default function MapTest() {
  const initialPosition = { lat: 43.7209711762384, lng: -79.421240170446 } as google.maps.LatLngLiteral;

  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(initialPosition);
  const [previousPosition, setPreviousPosition] = useState<google.maps.LatLngLiteral | null>(initialPosition);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAP_API_KEY} libraries={['marker']}>
        <Autocomplete onPlaceSelect={setSelectedPlace} setCurrentPosition={setCurrentPosition} />
        <BlobMap
          setPreviousPosition={setPreviousPosition}
          previousPosition={previousPosition}
          currentPosition={currentPosition}
          initialPosition={initialPosition}
        />
      </APIProvider>
    </>
  );
}
