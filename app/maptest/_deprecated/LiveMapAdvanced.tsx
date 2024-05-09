import React from 'react';

import { Status, Wrapper } from '@googlemaps/react-wrapper';

import Map from '@/app/maptest/_deprecated/Map';

export default function LiveMapGoogleAdvanced() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const render = (status: Status) => {
    if (status === Status.LOADING) return <h1>Loading...</h1>;

    if (status === Status.FAILURE) return <h1>Error</h1>;

    return <h1>{status}상태</h1>;
  };

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Map />
    </Wrapper>
  );
}
