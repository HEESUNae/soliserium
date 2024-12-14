'use client';

import { Button } from '@/shared';
import Image from 'next/image';
import styles from './apple-btn.module.css';

export const AppleBtn = () => {
  const handleLogin = () => {
    // const provider = new OAuthProvider('apple.com');
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const user = result.user;
    //     // Apple credential
    //     const credential = OAuthProvider.credentialFromResult(result);
    //     const accessToken = credential?.accessToken;
    //     const idToken = credential?.idToken;
    //     console.log(user, idToken);
    //   })
    //   .catch((error) => {
    //     // // Handle Errors here.
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     // // The email of the user's account used.
    //     // const email = error.customData.email;
    //     // // The credential that was used.
    //     const credential = OAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };
  return (
    <Button onClick={handleLogin}>
      <div className={styles.appleBtn}>
        <Image src="/icons/logo-apple.svg" alt="" width={22} height={22} />
        <p>Sign in with Apple</p>
      </div>
    </Button>
  );
};
