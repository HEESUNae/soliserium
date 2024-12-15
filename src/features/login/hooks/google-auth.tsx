'use client';

import { useUserAuthStore } from '@/entities';
import { auth } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useGoogleAuth = () => {
  const { setUserAuth } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      setIsLoading(true);
      router.push('/main');

      const { access_token } = res;
      const credential = GoogleAuthProvider.credential(null, access_token);
      const userCredential = await signInWithCredential(auth, credential);
      const result = userCredential.user;

      if (result) {
        const userData = {
          accessToken: access_token,
          id: result.uid!,
          name: result.displayName!,
          email: result.email!,
          photoURL: result.photoURL!,
          providerId: 'google',
        };
        setUserAuth(userData);
      }
      setIsLoading(false);
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
