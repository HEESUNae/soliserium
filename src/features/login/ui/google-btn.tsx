'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './google-btn.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useUserAuthStore } from '@/entities';
import { Button, auth } from '@/shared';
import { Loading } from '@/widgets/loading';

export const GoogleBtn = () => {
  const { setUserAuth } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const { access_token } = res;
      try {
        setIsLoading(true);
        const credential = GoogleAuthProvider.credential(null, access_token);
        const userCredential = await signInWithCredential(auth, credential);
        const result = userCredential.user;

        if (result) {
          const userData = {
            id: result.uid!,
            name: result.displayName!,
            email: result.email!,
            photoURL: result.photoURL!,
            providerId: 'google',
          };
          setUserAuth(userData);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Auth Error:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
      setIsLoading(false);
    },
    flow: 'implicit',
  });

  if (isLoading) return <Loading />;

  return (
    <Button onClick={googleLogin}>
      <div className={styles.googleLoginBtn}>
        <Image src="/icons/logo-google.svg" alt="" width={24} height={24} />
        <p>Sign in width Google</p>
      </div>
    </Button>
  );
};
