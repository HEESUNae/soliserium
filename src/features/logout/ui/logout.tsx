'use client';

import { setCookie, useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    useUserAuthStore.persist.clearStorage();
    setCookie('accessToken', '', 0);
    router.push('/login');
  };

  return (
    <Button onClick={handleLogout}>
      <Image src="/icons/nav/logout.svg" alt="" width={24} height={24} />
    </Button>
  );
};
