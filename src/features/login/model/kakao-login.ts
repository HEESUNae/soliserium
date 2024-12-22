import { useRouter, useSearchParams } from 'next/navigation';
import { getKakaoToken } from '../api/kakao-login';
import { useUserAuthStore } from '@/entities';

export const useKakaoLogin = () => {
  const code = useSearchParams().get('code') || '';
  const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  const handleUserAuth = async () => {
    if (code) {
      const data = await getKakaoToken(code);
      setUserAuth(data);
      router.push('/home');
    }
  };

  return {
    handleUserAuth,
  };
};
