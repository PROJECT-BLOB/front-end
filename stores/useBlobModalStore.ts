import { create } from 'zustand';

interface ModalStore {
  show: boolean;
  toggleModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export default useModalStore;
