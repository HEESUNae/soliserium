'use client';

import { useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './google-btn.module.css';

export const GoogleBtn = () => {
  const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const token = res.access_token;

      const result: any = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result) {
        console.log('data', result.data);
        const userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          photoURL: result.data.picture,
          providerId: 'google',
        };
        setUserAuth(userData);
      }
      console.log('userInfoResponse', result); // 개인정보 확인가능
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'implicit',
  });

  return (
    <Button onClick={googleLogin}>
      <div className={styles.googleLoginBtn}>
        <Image src="/icons/logo-google.svg" alt="" width={24} height={24} />
        <p>Sign in width Google</p>
      </div>
    </Button>
  );
};
