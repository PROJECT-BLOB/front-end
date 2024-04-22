import { create } from 'zustand';

interface UserStore {
  isLogin: boolean;

  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));
