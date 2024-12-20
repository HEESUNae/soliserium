import { create } from 'zustand';

interface openPostAddState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useOpenPostAddStore = create<openPostAddState>((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set(() => ({ isOpen: open })),
}));
