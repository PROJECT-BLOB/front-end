import { create } from 'zustand';

import { FullCategory } from '@/app/map/_components/Map/Filter';

interface CategoryStore {
  selectedCategoryList: FullCategory[] | [];
  setSelectedCategoryList: (category: FullCategory[] | []) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategoryList: [],
  setSelectedCategoryList: (selectedCategoryList) => set(() => ({ selectedCategoryList })),
}));
