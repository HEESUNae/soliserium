'use client';

import { Button } from '@/shared';
import Image from 'next/image';
import styles from './apple-btn.module.css';

export const AppleBtn = () => {
  const handleLogin = () => {};
  return (
    <Button onClick={handleLogin}>
      <div className={styles.appleBtn}>
        <Image src="/icons/logo-apple.svg" alt="" width={22} height={22} />
        <p>Sign in width Apple</p>
      </div>
    </Button>
  );
};
