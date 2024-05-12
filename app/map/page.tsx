'use client';

import React from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';

import Autocomplete from '@/app/map/_components/Autocomplete/Autocomplete';
import BlobMap from '@/app/map/_components/Map/BlobMap';

export default function MapTest() {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAP_API_KEY} libraries={['marker']}>
        <Autocomplete />
        <BlobMap />
      </APIProvider>
    </>
  );
}
