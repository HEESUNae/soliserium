'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './naver-btn.module.css';
import { useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import { Loading } from '@/widgets';

export const NaverBtn = () => {
  const router = useRouter();
  const { setUserAuth } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const checkNaverSdk = () => {
    try {
      const { naver } = window;
      if (naver.LoginWithNaverId) {
        const naverLogin = new naver.LoginWithNaverId({
          clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
          callbackUrl: process.env.NEXT_PUBLIC_HOST_URL! + '/login',
          isPopup: false,
          loginButton: { color: 'white', type: 2, height: '45' },
        });
        naverLogin.init();
        console.log('prev', naverLogin);
        naverLogin.getLoginStatus((status) => {
          if (status) {
            console.log('status', status);
            setIsLoading(true);
            const { id, email, nickname, profile_image } = naverLogin.user;
            console.log('naverLogin', naverLogin);
            const userData = {
              accessToken: naverLogin.accessToken.accessToken,
              id: id,
              name: nickname,
              email: email,
              photoURL: profile_image,
              providerId: 'naver',
            };
            setUserAuth(userData);
            setIsLoading(false);
            router.push('/main');
          }
        });
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Button onClick={checkNaverSdk}>
      <div className={styles.btnWrap}>
        <div id="naverIdLogin" className={styles.naverIdLogin}></div>
        <div className={styles.naverBtn}>
          <Image src="/icons/logo-naver.svg" alt="" width={18} height={18} />
          <p>Sign in with Naver</p>
        </div>
      </div>
    </Button>
  );
};
