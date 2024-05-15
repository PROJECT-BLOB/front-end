import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Location } from '@/types/Map';

interface UserStore {
  blobId: string;
  isSignin: boolean;
  isLoaded: boolean;

  signin: () => void;
  signout: () => void;
  setBlobId: (newBlobId: string) => void;

  lastLocation: Location;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      blobId: typeof window !== 'undefined' ? localStorage.getItem('blobId') ?? '' : '', // 초기 로딩 때 로컬스토리지에서 값을 읽어오도록 함
      isSignin: typeof window !== 'undefined' ? localStorage.getItem('isSignin') === 'true' : false, // 초기 로딩 때 로컬스토리지에서 값을 읽어오도록 함
      // blobId: '',
      // isSignin: false,
      isLoaded: false, // 로딩 상태 추가
      lastLocation: { lat: 0, lng: 0 },
      setBlobId: (newBlobId) => {
        localStorage.setItem('blobId', newBlobId); // 초기 로딩때 가져와야 하기 때문에 로컬스토리지에 값 저장
        set({ blobId: newBlobId });
      },
      signin: () => {
        localStorage.setItem('isSignin', 'true');
        set(() => ({ isSignin: true }));
      },
      signout: () => {
        localStorage.setItem('isSignin', 'false');
        set(() => ({ isSignin: false }));
      },
    }),
    {
      name: 'userStorage',
      onRehydrateStorage: () => (state) => {
        // 클라이언트에서만 실행
        if (typeof window !== 'undefined' && state) {
          state.blobId = localStorage.getItem('blobId') ?? '';
          state.isSignin = localStorage.getItem('isSignin') === 'true';
          state.isLoaded = true; // 로딩 완료
        }
      },
    },
  ),
);
