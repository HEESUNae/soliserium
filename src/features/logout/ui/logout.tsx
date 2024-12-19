'use client';

import { kakaoLogout } from '@/features/logout/api/kakao-logout';
import { useUserAuthStore } from '@/entities';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared';

export const Logout = () => {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    // 카카오일때
    if (userAuth.accessToken && userAuth.providerId === 'kakao') {
      kakaoLogout(userAuth.accessToken);
    }
    useUserAuthStore.persist.clearStorage();
    router.push('/login');
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
};
