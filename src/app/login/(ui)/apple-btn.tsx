'use client';
import { auth } from '@/shared/providers/firebase';
import { Button } from '@/shared/ui/button';
import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import styles from './apple-btn.module.css';

const provider = new OAuthProvider('apple.com');

export const AppleBtn = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;

        console.log('apple', user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);
      });
  };
  return (
    <Button onClick={handleLogin}>
      <div className={styles.appleBtn}>
        <Image src="/icons/logo-apple.svg" alt="" width={24} height={24} />
        <p>Apple 로그인</p>
      </div>
    </Button>
  );
};
