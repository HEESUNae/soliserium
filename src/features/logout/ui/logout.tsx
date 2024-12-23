'use client';

import { Button } from '@/shared';
import { useUserLogout } from '../model/logout';
import Image from 'next/image';

export const Logout = () => {
  const { handleLogout } = useUserLogout();

  return (
    <Button onClick={handleLogout}>
      <Image src="/icons/nav/logout.svg" alt="" width={24} height={24} />
    </Button>
  );
};
