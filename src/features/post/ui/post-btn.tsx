'use client';

import Image from 'next/image';
import { useUserAuthStore } from '@/entities';
import styles from './post-btn.module.css';

export const PostBtn = () => {
  const { userAuth } = useUserAuthStore();

  if (!userAuth) return <></>;

  return (
    <div className={styles.postBtn}>
      <Image src={userAuth.photoURL || '/icons/user-default.svg'} alt="" width={40} height={40} />
      <p>{userAuth.name}</p>
    </div>
  );
};
