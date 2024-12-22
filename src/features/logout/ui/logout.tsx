'use client';

import { Button } from '@/shared';
import { useUserLogout } from '../model/logout';

export const Logout = () => {
  const { handleLogout } = useUserLogout();

  return <Button onClick={handleLogout}>로그아웃</Button>;
};
