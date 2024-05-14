import { create } from 'zustand';

interface OAuthStore {
  blobId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  state: string | null;
  setOAuth: (blobId: string, accessToken: string, refreshToken: string, state: string) => void;
}

export const useOAuthStore = create<OAuthStore>((set) => ({
  blobId: null,
  accessToken: null,
  refreshToken: null,
  state: null,
  setOAuth: (blobId, accessToken, refreshToken, state) => set({ blobId, accessToken, refreshToken, state }),
}));
