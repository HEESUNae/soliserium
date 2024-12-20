import React from 'react';
import Image from 'next/image';
import styles from './post-add.module.css';
import { Button, Textarea } from '@/shared';
import { BottomSheet, ProfilePhoto } from '@/widgets';
import { useUserAuthStore } from '@/entities';
import { useOpenPostAddStore } from '../model/open-post-add-store';

interface PostAddProps {
  onClick: () => void;
  open?: boolean;
}

export const PostAdd = () => {
  const { userAuth } = useUserAuthStore();
  const { isOpen, setIsOpen } = useOpenPostAddStore();
  return (
    <>
      {isOpen && (
        <BottomSheet
          title="새로운 고민 작성"
          left={<Button onClick={() => setIsOpen(false)}>취소</Button>}
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
      )}
    </>
  );
};
