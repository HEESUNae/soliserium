'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserAuthStore } from '@/entities';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const notcheck = ['login', 'auth', 'find'].some((item) => item.includes(path));
    if (notcheck) return;

    if (!userAuth.accessToken) {
      router.push('/login');
    }
  }, [userAuth, window.location]);

  return <>{children}</>;
};
