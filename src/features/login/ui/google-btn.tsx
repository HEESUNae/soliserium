'use client';

import { useUserAuthStore } from '@/entities';
import { Button, auth } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import Image from 'next/image';
import styles from './google-btn.module.css';

export const GoogleBtn = () => {
  // const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const { access_token } = res;
      // const result = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //   },
      // });
      const credential = GoogleAuthProvider.credential(null, access_token);

      try {
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
        console.log('Firebase Auth User:', userCredential.user);
      } catch (error) {
        console.error('Firebase Auth Error:', error);
      }
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
