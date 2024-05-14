import { useQuery } from '@tanstack/react-query';

import getGeocodedAddress from '@apis/map/getGeocodedAddress';
import { blobmap } from '@queries/keys/blobmapQueryKeys';

import LatLngLiteral = google.maps.LatLngLiteral;

export function useGetReversedGeocodeAddress(location: LatLngLiteral) {
  return useQuery({
    queryKey: blobmap.reverseGeocodeAddress(location).queryKey,
    queryFn: () => getGeocodedAddress(location),
  });
}
