'use client';

import { setCookie, useUserAuthStore } from '@/entities';
import { auth } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import { User, signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserType extends User {
  accessToken: string;
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
}

export const useGoogleAuth = () => {
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

  return {
    isLoading,
    googleLogin,
  };
};
