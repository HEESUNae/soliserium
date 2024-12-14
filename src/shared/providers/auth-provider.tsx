'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuthStore } from '@/entities';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (userAuth.accessToken) {
      router.push('/main');
    } else {
      router.push('/login');
    }
  }, [userAuth]);

  return <>{children}</>;
};
