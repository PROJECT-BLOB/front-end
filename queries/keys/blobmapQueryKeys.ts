import { createQueryKeys } from '@lukemorales/query-key-factory';

import { Category } from '@apis/map/getMarkers';

import LatLngBoundsLiteral = google.maps.LatLngBoundsLiteral;
import LatLngLiteral = google.maps.LatLngLiteral;

export const blobmap = createQueryKeys('blobmap', {
  // all: null, // master-key 사용 관련해서는 추가 확인 필요.
  reverseGeocodeAddress: (location: LatLngLiteral) => ['geocodeAddress', [location]],
});

export const markers = createQueryKeys('markers', {
  all: null,
  byBounds: (bounds: LatLngBoundsLiteral) => ['markersByBounds', [bounds]],
  byCategory: (category: Category) => ['markersByCategory', [category]],
  byCategoryAndBounds: (category: Category, bounds: LatLngBoundsLiteral) => [
    'markersByCategoryAndBounds',
    [category, bounds],
  ],
});
