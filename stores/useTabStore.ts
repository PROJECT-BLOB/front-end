import { create } from 'zustand';

interface TabStore {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  selectedTab: '내가 쓴 글',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}));
