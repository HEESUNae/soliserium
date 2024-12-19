import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IdSaveState {
  savedId: string;
  setSavedId: (uid: string) => void;
}

export const useIdSaveStore = create(
  persist<IdSaveState>(
    (set) => ({
      savedId: '',
      setSavedId: (uid: string) => set(() => ({ savedId: uid })),
    }),
    {
      name: 'idSave',
    }
  )
);
