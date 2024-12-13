import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IdSaveState {
  savedId: string;
  setSavedId: (id: string) => void;
}

export const useIdSaveStore = create(
  persist<IdSaveState>(
    (set) => ({
      savedId: '',
      setSavedId: (id: string) => set(() => ({ savedId: id })),
    }),
    {
      name: 'idSave',
    }
  )
);
