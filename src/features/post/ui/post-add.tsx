'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import styles from './post-add.module.css';
import { useOpenPostAddStore } from '../model/open-post-add-store';
import { fetchAddPost } from '../api/add-post';
import { Button, Textarea } from '@/shared';
import { BottomSheet, ProfilePhoto } from '@/widgets';
import { useUserAuthStore } from '@/entities';

export const PostAdd = () => {
  const { userAuth } = useUserAuthStore();
  const { isOpen, setIsOpen } = useOpenPostAddStore();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleAddPost = async () => {
    try {
      const postData = {
        uid: userAuth.uid,
        name: userAuth.name,
        photoUrl: userAuth.photoURL,
        createAt: dayjs().format('YYYY-MM-DD:mm:ss'),
        content: textareaValue,
      };
      await fetchAddPost(postData);
      alert('글 작성이 완료되었습니다.');
      setIsOpen(false);
    } catch (e) {
      alert('글 작성에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

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
              {/* <div className={styles.photo}>
                <Image src="/images/sample.png" alt="" width={260} height={150} />
              </div> */}
              <Textarea placeholder="고민을 입력해주세요" onChange={handleTextareaValue} />
            </div>
          </div>
          <div className={styles.buttonBtnWrap}>
            <Button className="fill" onClick={handleAddPost}>
              등록하기
            </Button>
          </div>
        </BottomSheet>
      )}
    </>
  );
};
