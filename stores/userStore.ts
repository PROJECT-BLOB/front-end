import { create } from 'zustand';

interface UserStore {
  isSignin: boolean;

  signin: () => void;
  signout: () => void;

  lastLocation: Location;
}

// google에서 사용하는 api 네이밍과 동일하게 하기위해, 줄임말 사용.
// 위치는 다른 곳으로 옮겨봐야할 것 같아요.
interface Location {
  lat: number;
  lng: number;
}

export const useUserStore = create<UserStore>((set) => ({
  isSignin: false,
  lastLocation: { lat: 0, lng: 0 },
  signin: () => set(() => ({ isSignin: true })),
  signout: () => set(() => ({ isSignin: false })),
}));
