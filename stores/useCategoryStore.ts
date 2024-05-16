import { create } from 'zustand';

import { FullCategory } from '@/app/map/_components/Map/Filter';

interface CategoryStore {
  selectedCategoryList: FullCategory[] | [];
  setSelectedCategoryList: (category: FullCategory[] | []) => void;
  clearCategoryList: () => void;
  addListItem: (category: FullCategory) => void;
  removeListItem: (category: FullCategory) => void;
  hasItem: (category: FullCategory) => boolean;
  getCategoryString: () => string;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  selectedCategoryList: [],
  setSelectedCategoryList: (selectedCategoryList) => set(() => ({ selectedCategoryList })),
  clearCategoryList: () => set(() => ({ selectedCategoryList: [] })),
  addListItem: (category: FullCategory) =>
    set((state) => ({ selectedCategoryList: [...state.selectedCategoryList, category] })),
  removeListItem: (category: FullCategory) =>
    set((state) => ({ selectedCategoryList: state.selectedCategoryList.filter((item) => item !== category) })),
  hasItem: (category: FullCategory) => {
    return get().selectedCategoryList!.filter((item) => item === category).length > 0;
  },
  getCategoryString: () => {
    return get().selectedCategoryList.join(',');
  },
}));
