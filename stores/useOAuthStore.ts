import { create } from 'zustand';

interface OAuthStore {
  userId: number | 0;
  accessToken: string | null;
  refreshToken: string | null;
  state: string | null;
  setOAuth: (userId: number, accessToken: string, refreshToken: string, state: string) => void;
}

export const useOAuthStore = create<OAuthStore>((set) => ({
  userId: 0,
  accessToken: null,
  refreshToken: null,
  state: null,
  setOAuth: (userId, accessToken, refreshToken, state) => set({ userId, accessToken, refreshToken, state }),
}));
