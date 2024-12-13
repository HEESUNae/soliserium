'use client';

import { useUserAuthStore } from '@/entities';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (userAuth.email) {
      router.push('/main');
    } else {
      router.push('/login');
    }
  }, [userAuth]);

  return <>{children}</>;
};
