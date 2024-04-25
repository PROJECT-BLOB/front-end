import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export default function Map() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const containerStyle = {
    width: '70%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
  };

  const center = {
    lat: 0,
    lng: -0,
  };

  const options = {
    disableDefaultUI: true,
    minZoom: 8,
    zoomControl: true,
  };

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom: 8 }));
      console.log('map created');
    }
  }, [ref, map]);

  return <div ref={ref} style={{ width: '70%', height: '60vh' }} />;
}
