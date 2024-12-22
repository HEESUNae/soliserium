import { setCookie, useUserAuthStore } from '@/entities';
import { useRouter } from 'next/navigation';

export const useUserLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    useUserAuthStore.persist.clearStorage();
    setCookie('accessToken', '', 0);
    router.push('/login');
  };
  return {
    handleLogout,
  };
};
