import React, { useCallback, useState } from 'react';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

/*
 * [Next.js]구글 맵 @react-google-maps/api 활용해서 구현
 * @see: https://velog.io/@hansoom3315/Next.js%EA%B5%AC%EA%B8%80-%EB%A7%B5-react-google-mapsapi-%ED%99%9C%EC%9A%A9%ED%95%B4%EC%84%9C-%EA%B5%AC%ED%98%84
 * */
/* react-google-maps/api 라이브러리를 사용하여 구글 맵을 구현한다.
@see: https://visgl.github.io/react-google-maps/examples/markers-and-infowindows
* */

export default function LiveMapGoogleMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const containerStyle = {
    width: '70%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
  };

  const center = {
    lat: 43.731111,
    lng: -79.381111,
  };

  const options = {
    disableDefaultUI: true,
    minZoom: 8,
    zoomControl: true,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey,
  });

  // const markerCluster = new MarkerClusterer({ map, markers });

  const onLoad = useCallback(function callback(map: google.maps.Map | null) {
    // 센터로 초기화
    const bounds = new window.google.maps.LatLngBounds(center);

    // 또는 마커 영역에 맞게 확장
    // const bounds = new window.google.maps.LatLngBounds();
    // locations.forEach((location) => {
    //   bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
    // });

    if (map) {
      map.fitBounds(bounds);
      setMap(map);
    }
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onResize = () => {
    map?.setCenter(center);
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
          onZoomChanged={onResize}
        >
          {/* <Markers /> */}
        </GoogleMap>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
