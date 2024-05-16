/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';

import { Cluster, ClusterStats, Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { interpolateRgb } from 'd3-interpolate';

import MarkerWithInfoWindow from '@/app/map/_components/Marker/MarkerWithInfoWindow';
import { useGetMarkers } from '@queries/useBlobmapQueries';
import { useCategoryStore } from '@stores/useCategoryStore';
import { useMapStore } from '@stores/useMapStore';

const interpolatedRenderer = {
  palette: interpolateRgb('red', 'blue'),
  render({ count, position }: Cluster, stats: ClusterStats): google.maps.Marker {
    // use d3-interpolateRgb to interpolate between red and blue
    const color = this.palette(count / stats.clusters.markers.max);

    // create svg url with fill color
    const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".8" r="70" />    
  </svg>`);

    // create marker using svg icon
    return new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;base64,${svg}`,
        scaledSize: new google.maps.Size(75, 75),
      },
      label: {
        text: String(count),
        color: 'rgba(255,255,255,0.9)',
        fontSize: '12px',
      },
      // adjust zIndex to be above other markers
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    });
  },
};

// eslint-disable-next-line
export default function Markers() {
  const lastBound = useMapStore((state) => state.lastBound);
  const selectedCategoryList = useCategoryStore((state) => state.selectedCategoryList);
  const categoryString = selectedCategoryList.join(',');

  const { data } = useGetMarkers(categoryString, lastBound);
  const locations = data ? data.data : [];
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;

    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map, renderer: interpolatedRenderer });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;

    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      }

      const newMarkers = { ...prev };
      delete newMarkers[key];

      return newMarkers;
    });
  };

  return (
    <>
      {locations.length > 0 &&
        locations.map((point) => (
          <AdvancedMarker
            // animation={google.maps.Animation.BOUNCE}
            key={`${point.postId}`}
            title={point.title}
            position={{ lat: point.lat, lng: point.lng }}
            onClick={() => console.log('MarkerClicked')}
            ref={(marker) => setMarkerRef(marker, point.postId.toString())}
          >
            <MarkerWithInfoWindow createdAt={'3시간전'} title={point.title} markerType={point.category} opacity={100} />
          </AdvancedMarker>
        ))}
    </>
  );
}
