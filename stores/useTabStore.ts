import { create } from 'zustand';

interface TabStore {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  selectedTab: 'MyPosts',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}));
