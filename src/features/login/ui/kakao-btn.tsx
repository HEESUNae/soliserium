'use client';

import styles from './kakao-btn.module.css';
import Script from 'next/script';
import Image from 'next/image';
import { useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import { KakaoAuthResponse } from '../types/kakao-auth-type';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const KakaoBtn = () => {
  const { setUserAuth } = useUserAuthStore();

  const kakaoLogin = async () => {
    try {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }

      window.Kakao.Auth.login({
        success: async function (data: KakaoAuthResponse) {
          const res = await window.Kakao.API.request({ url: '/v2/user/me' });
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
        },
        fail: function (data: unknown) {
          console.log('fail :', data);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button onClick={kakaoLogin}>
        <div className={styles.kakaoBtn}>
          <Image src="/icons/logo-kakao.svg" alt="" width={20} height={20} />
          <p>Sign in with Kakao</p>
        </div>
      </Button>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </>
  );
};
