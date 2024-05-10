import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SearchedCity } from '@types/Map';

import LatLngLiteral = google.maps.LatLngLiteral;

const LOCATION_SEOUL = {
  lat: 37.5665,
  lng: 126.978,
};

const DEFAULT_SEARCHED_CITY = {
  country: '대한민국',
  city: '서울',
  location: LOCATION_SEOUL,
};

interface MapStore {
  // 사용자가 마지막으로 본 위치좌표
  lastMapCenter: LatLngLiteral;
  setLastMapCenter: (location: LatLngLiteral | undefined) => void;

  // 사용자가 마지막으로 검색한 도시 정보
  lastSearchCity: SearchedCity;
  setLastSearchCity: (city: SearchedCity) => void;
}

export const useMapStore = create(
  persist<MapStore>(
    (set) => ({
      lastMapCenter: DEFAULT_SEARCHED_CITY.location,
      setLastMapCenter: (newLocation) => set({ lastMapCenter: newLocation }),
      lastSearchCity: DEFAULT_SEARCHED_CITY,
      setLastSearchCity: (city) => set({ lastSearchCity: city }),
    }),
    {
      name: 'blob-map-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
