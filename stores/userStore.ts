import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userId: number;
  isSignin: boolean;

  signin: () => void;
  signout: () => void;
  setUserId: (newUserId: number) => void;

  lastLocation: Location;
}

// google에서 사용하는 api 네이밍과 동일하게 하기위해, 줄임말 사용.
// 위치는 다른 곳으로 옮겨봐야할 것 같아요.
interface Location {
  lat: number;
  lng: number;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: 0,
      isSignin: typeof window !== 'undefined' ? localStorage.getItem('isSignin') === 'true' : false, // 초기 로딩 때 로컬스토리지에서 값을 읽어오도록 함
      lastLocation: { lat: 0, lng: 0 },
      setUserId: (newUserId: number) => set({ userId: newUserId }),
      signin: () => {
        set(() => ({ isSignin: true }));
      },
      signout: () => {
        set(() => ({ isSignin: false }));
      },
    }),
    {
      name: 'userStorage',
    },
  ),
);
