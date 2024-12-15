import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserInfoType } from '../types/use-info-type';

interface AuthState {
  userAuth: UserInfoType;
  setUserAuth: (userInfo: UserInfoType) => void;
}

export const useUserAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userAuth: {},
      setUserAuth: (userInfo: UserInfoType) => set(() => ({ userAuth: userInfo })),
    }),
    {
      name: 'auth-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
