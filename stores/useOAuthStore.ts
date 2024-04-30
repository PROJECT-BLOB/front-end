import { create } from 'zustand';

interface OAuthStore {
  oauthId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setOAuth: (oauthId: string, accessToken: string, refreshToken: string) => void;
}

export const useOAuthStore = create<OAuthStore>((set) => ({
  oauthId: null,
  accessToken: null,
  refreshToken: null,
  setOAuth: (oauthId, accessToken, refreshToken) => set({ oauthId, accessToken, refreshToken }),
}));
