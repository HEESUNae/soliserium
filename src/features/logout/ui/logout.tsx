'use client';

import { setCookie, useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    useUserAuthStore.persist.clearStorage();
    setCookie('accessToken', '', 0);
    router.push('/login');
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
};
