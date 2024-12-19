'use client';

import styles from './post-btn.module.css';
import { useUserAuthStore } from '@/entities';
import { ProfilePhoto } from '@/widgets';

interface PostBtnProps {
  onClick: () => void;
}

export const PostBtn = ({ onClick }: PostBtnProps) => {
  const { userAuth } = useUserAuthStore();

  return (
    <div className={styles.postBtn} onClick={onClick}>
      <figure>
        <ProfilePhoto src={userAuth.photoURL || '/images/user-default.png'} alt="" width={36} height={36} />
      </figure>
      <div>
        <h3>{userAuth.name}</h3>
        <p>고민을 적어보세요</p>
      </div>
    </div>
  );
};
