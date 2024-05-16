import { create } from 'zustand';

export type Order = 'hot' | 'likes' | 'views' | 'recent';

export interface FilteredData {
  // cityLat?: number;
  // cityLng?: number;
  sortBy: Order;
  categories: string;
  startDate: string;
  endDate: string;
  hasImage: boolean;
  hasLocation: boolean;
  minLikes: number;
  keyword: string;
}

type State = {
  filteredData: FilteredData;
  setFilteredData: (newData: Partial<FilteredData>) => void;
};

export const useFilteringStore = create<State>((set) => ({
  filteredData: {
    cityLat: 37.5518911,
    cityLng: 126.9917937,
    sortBy: 'recent',
    categories: '',
    startDate: '',
    endDate: '',
    hasImage: false,
    hasLocation: false,
    minLikes: 0,
    keyword: '',
  },

  setFilteredData: (newData) => set((state) => ({ filteredData: { ...state.filteredData, ...newData } })),
}));
