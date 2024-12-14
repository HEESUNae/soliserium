'use client';

import { useUserAuthStore } from '@/entities';
import Image from 'next/image';
import KakaoLogin from 'react-kakao-login';
import styles from './kakao-btn.module.css';

interface KakaoAuthResponse {
  profile: {
    connected_at: string;
    id: number;
    kakao_account: {
      profile?: {
        is_default_image: boolean;
        is_default_nickname: boolean;
        nickname: string;
        profile_image_url?: string;
        thumbnail_image_url?: string;
      };
      profile_image_needs_agreement: boolean;
      profile_nickname_needs_agreement: boolean;
    };
    properties: {
      nickname: string;
      profile_image?: string;
      thumbnail_image?: string;
    };
  };
  response: {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    token_type: string;
  };
}

export const KakaoBtn = () => {
  const { setUserAuth } = useUserAuthStore();

  const kakaoOnSuccess = (data: unknown) => {
    // const idToken = data.response.access_token;
    // console.log('data', data);
    const { profile } = data as KakaoAuthResponse;

    if (profile) {
      const userData = {
        id: profile.id,
        name: profile.properties.nickname,
        email: 'kakao',
        photoURL: profile.properties.profile_image,
        providerId: 'kakao',
      };
      setUserAuth(userData);
    }
  };

  const kakaoOnFailure = (error: unknown) => {
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
