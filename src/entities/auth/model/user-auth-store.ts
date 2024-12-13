import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {
  name?: string;
  email?: string;
  photoURL?: string;
  providerId?: string;
  id?: string;
}

interface AuthState {
  userAuth: UserInfo;
  setUserAuth: (userInfo: UserInfo) => void;
}

export const useUserAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userAuth: {},
      setUserAuth: (userInfo: UserInfo) => set(() => ({ userAuth: userInfo })),
    }),
    {
      name: 'auth-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
