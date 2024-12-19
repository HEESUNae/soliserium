'use client';

import Image from 'next/image';
import styles from './post-btn.module.css';
import { useUserAuthStore } from '@/entities';

interface PostBtnProps {
  onClick: () => void;
}

export const PostBtn = ({ onClick }: PostBtnProps) => {
  const { userAuth } = useUserAuthStore();

  return (
    <div className={styles.postBtn} onClick={onClick}>
      <figure>
        <Image src={userAuth.photoURL || '/images/user-default.png'} alt="" width={40} height={40} />
      </figure>
      <div>
        <h3>{userAuth.name}</h3>
        <p>고민을 적어보세요</p>
      </div>
    </div>
  );
};
