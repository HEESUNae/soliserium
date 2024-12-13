'use client';

import Image from 'next/image';
import styles from './post-btn.module.css';
import { useUserAuthStore } from '@/entities';

export const PostBtn = () => {
  const { userAuth } = useUserAuthStore();

  if (!userAuth.photoURL) return <></>;

  return (
    <div className={styles.postBtn}>
      <Image src={userAuth.photoURL || '/icons/user-default.svg'} alt="" width={40} height={40} />
      <p>{userAuth.name}</p>
    </div>
  );
};
