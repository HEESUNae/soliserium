'use client';

import { Button, auth } from '@/shared';
import { Loading } from '@/widgets/loading';
import Image from 'next/image';
import styles from './google-btn.module.css';
import { setCookie, useUserAuthStore } from '@/entities';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { User, signInWithCredential } from 'firebase/auth';

interface UserType extends User {
  accessToken: string;
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
}

export const GoogleBtn = () => {
  const { setUserAuth } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const { access_token } = res;
      try {
        setIsLoading(true);
        const credential = GoogleAuthProvider.credential(null, access_token);
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user as UserType;

        setCookie('accessToken', user.accessToken, user.stsTokenManager.expirationTime);
        if (user) {
          const userData = {
            uid: user.uid!,
            name: user.displayName!,
            email: user.email!,
            photoURL: user.photoURL!,
            providerId: 'google',
            isVote: false,
          };
          setUserAuth(userData);
          router.push('/home');
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Auth Error:', error);
      }
    },
    onError: () => {
      setIsLoading(false);
      console.log('Login Failed');
    },
    flow: 'implicit',
  });

  if (isLoading) return <Loading />;

  return (
    <Button onClick={googleLogin}>
      <div className={styles.googleLoginBtn}>
        <Image src="/icons/logo/google.svg" alt="" width={24} height={24} />
        <p>Sign in with Google</p>
      </div>
    </Button>
  );
};
