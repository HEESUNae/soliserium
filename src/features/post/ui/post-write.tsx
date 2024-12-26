'use client';
import { useUserAuthStore } from '@/entities';
import { Button, Textarea } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import { DocumentData } from 'firebase/firestore';
import styles from './post-write.module.css';
import { usePostModelStore } from '../model/post-model-store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { fetchUpdatePost } from '../api/update-post';
import { fetchAddPost } from '../api/add-post';

interface PostWriteProps {
  postData?: DocumentData;
  mode?: string;
  onClick?: () => void;
}

export const PostWrite = ({ postData = {}, mode = 'add' }: PostWriteProps) => {
  const { setIsOpen } = usePostModelStore();
  const { userAuth } = useUserAuthStore();
  const [textareaValue, setTextareaValue] = useState<string>('');
  const router = useRouter();
  const path = usePathname();

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  // 포스트 작성
  const handleAddPost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    const now = dayjs();
    const createTimestemp = dayjs(now).valueOf();
    try {
      const data = {
        uid: userAuth.uid,
        name: userAuth.name,
        photoUrl: userAuth.photoURL,
        createAt: createTimestemp,
        content: textareaValue,
      };
      await fetchAddPost(data, 'posts');
      setIsOpen(false);
      if (path !== '/home') router.push('/home');
    } catch (e) {
      alert('포스트 작성에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  // 포스트 수정
  const handleUpdatePost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    try {
      if (mode === 'update') {
        await fetchUpdatePost(postData.id, textareaValue);
      }
      if (mode === 'send') {
        const now = dayjs();
        const createTimestemp = dayjs(now).valueOf();
        const data = {
          sendUserUid: userAuth.uid,
          sendUserName: userAuth.name,
          sendPhotoUrl: userAuth.photoURL,
          receiveUserUid: postData.uid,
          receiveUserName: postData.name,
          content: textareaValue,
          createAt: createTimestemp,
          mailCheck: false,
        };
        await fetchAddPost(data, 'mail');
        alert('우편이 상대방에게 전송되었습니다.');
      }
      setIsOpen(false);
    } catch (e) {
      alert('포스트 수정에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.contentWrap}>
        <ProfilePhoto src={userAuth.photoURL ?? ''} alt="" width={40} height={40} />
        <div className={styles.inputWrap}>
          <p className={styles.userName}>{userAuth.name}</p>
          <Textarea
            placeholder={mode === 'send' ? '여기에 조언을 적어보세요' : '여기에 고민을 적어보세요'}
            onChange={handleTextareaValue}
            value={(postData && mode === 'update' && postData.content) || ''}
          />
        </div>
      </div>
      <div className={styles.buttonBtnWrap}>
        <Button className="fill" onClick={mode !== 'add' ? handleUpdatePost : handleAddPost}>
          {mode === 'send' ? '보내기' : '등록하기'}
        </Button>
      </div>
    </>
  );
};
