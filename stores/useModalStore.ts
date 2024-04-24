import { create } from 'zustand';

// 1차 레이어?? 모달 생길 시 추가
export type ModalName = '' | 'write' | 'read';

interface ModalStore {
  isOpen: boolean;
  name: string;
  toggleModal: () => void;
  setName: (modalName: ModalName) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  name: '',
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setName: (modalName) => set(() => ({ name: modalName })),
}));

export default useModalStore;
