import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AlramState {
  isAlram: boolean;
  setIsAlram: (isAlram: boolean) => void;
}

export const useAlramStore = create(
  persist<AlramState>(
    (set) => ({
      isAlram: false,
      setIsAlram: (isAlram: boolean) => set(() => ({ isAlram })),
    }),
    {
      name: 'alram',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
