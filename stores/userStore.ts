import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Location } from '@types/Map';

interface UserStore {
  userId: number;
  isSignin: boolean;

  signin: () => void;
  signout: () => void;
  setUserId: (newUserId: number) => void;

  lastLocation: Location;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: typeof window !== 'undefined' ? Number(localStorage.getItem('userId')) : 0, // 초기 로딩 때 로컬스토리지에서 값을 읽어오도록 함
      isSignin: typeof window !== 'undefined' ? localStorage.getItem('isSignin') === 'true' : false, // 초기 로딩 때 로컬스토리지에서 값을 읽어오도록 함
      lastLocation: { lat: 0, lng: 0 },
      setUserId: (newUserId) => {
        localStorage.setItem('userId', String(newUserId)); // 초기 로딩때 가져와야 하기 때문에 로컬스토리지에 값 저장
        set({ userId: newUserId });
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
    },
  ),
);
