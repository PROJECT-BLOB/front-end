'use client';

import React from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';

import Autocomplete from '@/app/map/_components/Autocomplete/Autocomplete';
import BlobMap from '@/app/map/_components/Map/BlobMap';
import useModalStore from '@stores/useModalStore';

import SideBar from './_components/SideBar/SideBar';

export default function Map() {
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const { toggleModal } = useModalStore();

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAP_API_KEY} libraries={['marker']}>
        <Autocomplete />
        <BlobMap />
      </APIProvider>
      <button type='button' onClick={() => toggleModal()}>
        맵모달
      </button>
      <SideBar />
    </>
  );
}
