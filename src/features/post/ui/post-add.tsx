import React from 'react';
import Image from 'next/image';
import styles from './post-add.module.css';
import { Button, Textarea } from '@/shared';
import { BottomSheet, ProfilePhoto } from '@/widgets';
import { useUserAuthStore } from '@/entities';

interface PostAddProps {
  onClick: () => void;
}

export const PostAdd = ({ onClick }: PostAddProps) => {
  const { userAuth } = useUserAuthStore();
  return (
    <BottomSheet
      title="새로운 고민 작성"
      left={<Button onClick={onClick}>취소</Button>}
      right={
        <Button>
          <Image src="/icons/photo-add.svg" alt="" width={24} height={24} />
        </Button>
      }
    >
      <div className={styles.contentWrap}>
        <ProfilePhoto src={userAuth.photoURL ?? ''} alt="" width={40} height={40} />
        <div className={styles.inputWrap}>
          <p className={styles.userName}>{userAuth.name}</p>
          <div className={styles.photo}>
            <Image src="/images/sample.png" alt="" width={260} height={150} />
          </div>
          <Textarea placeholder="고민을 입력해주세요" />
        </div>
      </div>
    </BottomSheet>
  );
};
