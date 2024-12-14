'use client';

import { useUserAuthStore } from '@/entities';
import Image from 'next/image';
import KakaoLogin from 'react-kakao-login';
import styles from './kakao-btn.module.css';

export const KakaoBtn = () => {
  const { setUserAuth } = useUserAuthStore();

  const kakaoOnSuccess = async (data: any) => {
    // const idToken = data.response.access_token;
    const result = data.profile;

    if (data) {
      const userData = {
        id: result.id!,
        name: result.properties.nickname,
        email: 'kakao',
        photoURL: result.properties.profile_image,
        providerId: 'kakao',
      };
      setUserAuth(userData);
    }
  };

  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={process.env.NEXT_PUBLIC_KAKAO_KEY as string}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      onLogout={console.info}
      render={({ onClick }) => {
        return (
          <div
            className={styles.kakaoBtn}
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            <Image src="/icons/logo-kakao.svg" alt="" width={20} height={20} />
            <p>Sign in with Kakao</p>
          </div>
        );
      }}
      useLoginForm
    />
  );
};
