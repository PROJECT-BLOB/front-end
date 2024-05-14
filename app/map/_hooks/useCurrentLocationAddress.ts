import { useGetReversedGeocodeAddress } from '@queries/useBlobmapQueries';
import { useMapStore } from '@stores/useMapStore';

export default function useCurrentLocationAddress(): string {
  const currentLocation = useMapStore((state) => state.lastMapCenter);
  const { data, isError } = useGetReversedGeocodeAddress(currentLocation);

  if (isError) {
    throw Error('Failed to fetch current location address');
  }

  return data?.data || '표시할 주소 없음';
}
