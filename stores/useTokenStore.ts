import { create } from 'zustand';

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
}));
