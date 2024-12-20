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
    if (userAuth.accessToken === null) {
      const notcheck = ['/auth', '/find'].some((item) => item.includes(path));
      if (notcheck) return;

      alert('로그인 시간이 만료되었습니다.');
      router.push('/login');
    }
  }, [userAuth]);

  return <>{children}</>;
};
