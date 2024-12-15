import { useUserAuthStore } from '@/entities';
import { useState } from 'react';
import { KakaoAuthResponse } from '../types/social-login-type';
import { useRouter } from 'next/navigation';

export const useKakaoAuth = () => {
  const { setUserAuth } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const kakaoLogin = async () => {
    try {
      const { Kakao } = window;

      // kakao sdk 리셋
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY!);
      }

      // 로그인
      Kakao.Auth.login({
        success: async function (data: KakaoAuthResponse) {
          setIsLoading(true);
          const res = await Kakao.API.request({ url: '/v2/user/me' });
          const { id, properties } = res;
          const userData = {
            accessToken: data.access_token,
            id: id,
            name: properties.nickname,
            email: 'kakao',
            photoURL: properties.profile_image,
            providerId: 'kakao',
          };
          setUserAuth(userData);
          setIsLoading(false);
          router.push('/main');
        },
        fail: function (data: unknown) {
          console.log('fail :', data);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    kakaoLogin,
  };
};
