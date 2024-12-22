'use client';

import { Button } from '@/shared';
import { Loading } from '@/widgets/loading';
import Image from 'next/image';
import styles from './google-btn.module.css';
import { useGoogleAuth } from '../model/google-login';

export const GoogleBtn = () => {
  const { isLoading, googleLogin } = useGoogleAuth();

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
