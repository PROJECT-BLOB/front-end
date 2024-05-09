import { create } from 'zustand';

export type ModalName = 'write' | 'read' | 'registerUser' | 'updateProfile' | 'filtering';

interface ModalStore {
  postId: number;
  isOpen: boolean;
  name: ModalName;
  setPostId: (postId: number) => void;
  toggleModal: () => void;
  setCurrentName: (modalName: ModalName) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  postId: 1,
  isOpen: false,
  name: 'read',
  setPostId: (postId) => set(() => ({ postId })),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setCurrentName: (modalName) => set(() => ({ name: modalName })),
}));

export default useModalStore;
