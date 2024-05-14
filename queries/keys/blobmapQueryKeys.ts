import { createQueryKeys } from '@lukemorales/query-key-factory';

import LatLngLiteral = google.maps.LatLngLiteral;

export const blobmap = createQueryKeys('blobmap', {
  // all: null, // master-key 사용 관련해서는 추가 확인 필요.
  reverseGeocodeAddress: (location: LatLngLiteral) => ['geocodeAddress', [location]],
});
