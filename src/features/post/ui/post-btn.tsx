'use client';

import styles from './post-btn.module.css';
import { useUserAuthStore } from '@/entities';
import { ProfilePhoto } from '@/widgets';
import { useOpenPostAddStore } from '../model/open-post-add-store';

export const PostBtn = () => {
  const { userAuth } = useUserAuthStore();
  const { setIsOpen } = useOpenPostAddStore();

  return (
    <div className={styles.postBtn} onClick={() => setIsOpen(true)}>
      <figure>
        <ProfilePhoto src={userAuth.photoURL || '/images/user-default.png'} alt="" width={36} height={36} />
      </figure>
      <div>
        <h3>{userAuth.name}</h3>
        <p>여기에 고민을 적어보세요</p>
      </div>
    </div>
  );
};
