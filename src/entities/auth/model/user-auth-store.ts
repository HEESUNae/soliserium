import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {
  displayName?: string;
  email?: string;
  photoURL?: string;
  providerId?: string;
  uid?: string;
}

interface AuthState {
  userInfo: UserInfo;
  setUserAuth: (userInfo: UserInfo) => void;
}

export const useUserAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userInfo: [],
      setUserAuth: (userInfo: UserInfo) => set(() => ({ userInfo })),
    }),
    {
      name: 'auth-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
