import { create } from 'zustand';

interface PostModelState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const usePostModelStore = create<PostModelState>((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set(() => ({ isOpen: open })),
}));
