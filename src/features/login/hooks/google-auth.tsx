'use client';

import { useUserAuthStore } from '@/entities';
import { auth } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useState } from 'react';

export const useGoogleAuth = () => {
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
            accessToken: access_token,
            uid: result.uid!,
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
