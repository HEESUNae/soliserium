'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './google-btn.module.css';
import { Button } from '@/shared/ui/button';
import { auth } from '@/shared/providers/firebase';
import { useUserAuthStore } from '../../../entities/auth/model/user-auth-store';

export const GoogleBtn = () => {
  const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);

      if (credential) {
        const userData = {
          displayName: data.user.displayName!,
          email: data.user.email!,
          photoURL: data.user.photoURL!,
          providerId: data.user.providerData[0].providerId,
          uid: data.user.providerData[0].uid,
        };
        setUserAuth(userData);
        router.push('/main');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={handleSignIn}>
      <div className={styles.googleLoginBtn}>
        <Image src="/icons/logo-google.svg" alt="" width={24} height={24} />
        <p>Google 로그인</p>
      </div>
    </Button>
  );
};
