import { useQuery } from '@tanstack/react-query';

import getGeocodedAddress from '@apis/map/getGeocodedAddress';
import getMarkers, { Category } from '@apis/map/getMarkers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getSidebarItems, { SortInSidebar } from '@apis/map/getSidebarItems';
import { blobmap } from '@queries/keys/blobmapQueryKeys';

import LatLngLiteral = google.maps.LatLngLiteral;
import LatLngBoundsLiteral = google.maps.LatLngBoundsLiteral;

export function useGetReversedGeocodeAddress(location: LatLngLiteral) {
  return useQuery({
    queryKey: blobmap.reverseGeocodeAddress(location).queryKey,
    queryFn: () => getGeocodedAddress(location),
  });
}

// TODO: Query-Key-Factory 적용 필요.
export function useGetMarkers(categories: Category[], bounds: LatLngBoundsLiteral) {
  return useQuery({
    queryKey: ['markers', categories, bounds],
    queryFn: () =>
      getMarkers({
        categories,
        maxLat: bounds.north,
        minLat: bounds.south,
        maxLng: bounds.east,
        minLng: bounds.west,
      }),
  });
}

export function useGetSidebarItems(
  categories: Category[],
  bounds: LatLngBoundsLiteral,
  page: number,
  size: number,
  sortBy: SortInSidebar,
) {
  return useQuery({
    queryKey: ['markers', categories, bounds],
    queryFn: () =>
      getSidebarItems({
        categories,
        maxLat: bounds.north,
        minLat: bounds.south,
        maxLng: bounds.east,
        minLng: bounds.west,
        page,
        size,
        sortBy,
      }),
  });
}
