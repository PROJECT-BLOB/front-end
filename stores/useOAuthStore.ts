import { create } from 'zustand';

interface OAuthStore {
  oauthId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  state: string | null;
  setOAuth: (oauthId: string, accessToken: string, refreshToken: string, state: string) => void;
}

export const useOAuthStore = create<OAuthStore>((set) => ({
  oauthId: null,
  accessToken: null,
  refreshToken: null,
  state: null,
  setOAuth: (oauthId, accessToken, refreshToken, state) => set({ oauthId, accessToken, refreshToken, state }),
}));
