import { create } from 'zustand';

export type ModalName = 'write' | 'read';

interface ModalStore {
  postId: number;
  isOpen: boolean;
  name: string;
  setPostId: (postId: number) => void;
  toggleModal: () => void;
  setCurrentName: (modalName: ModalName) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  postId: 0,
  isOpen: false,
  name: '',
  setPostId: (postId) => set(() => ({ postId })),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setCurrentName: (modalName) => set(() => ({ name: modalName })),
}));

export default useModalStore;
