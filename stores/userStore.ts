import { create } from 'zustand';

interface UserStore {
  isLogin: boolean;

  login: () => void;
  logout: () => void;

  lastLocation: Location;
}

// google에서 사용하는 api 네이밍과 동일하게 하기위해, 줄임말 사용.
// 위치는 다른 곳으로 옮겨봐야할 것 같아요.
interface Location {
  lat: number;
  lng: number;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  lastLocation: { lat: 0, lng: 0 },
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));
