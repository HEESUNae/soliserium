import { fetchAddPost, useUserAuthStore } from '@/entities';
import { Button, Textarea } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useOpenPostAddStore } from '../model/open-post-add-store';
import styles from './post-write.module.css';
import { fetchUpdatePost } from '@/entities/post/api/update-post';

interface PostWriteProps {
  data?: DocumentData;
  onClick?: () => void;
}

export const PostWrite = ({ data }: PostWriteProps) => {
  const { setIsOpen } = useOpenPostAddStore();
  const { userAuth } = useUserAuthStore();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  // 포스트 작성
  const handleAddPost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    const now = dayjs();
    const createTimestemp = dayjs(now).valueOf();
    try {
      const postData = {
        uid: userAuth.uid,
        name: userAuth.name,
        photoUrl: userAuth.photoURL,
        createAt: createTimestemp,
        content: textareaValue,
      };
      await fetchAddPost(postData);
      setIsOpen(false);
    } catch (e) {
      alert('포스트 작성에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  const handleUpdatePost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    try {
      if (data) {
        await fetchUpdatePost(data.id, textareaValue);
        setIsOpen(false);
      }
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
          <Textarea placeholder="여기에 고민을 적어보세요" onChange={handleTextareaValue} value={(data && data.content) || ''} />
        </div>
      </div>
      <div className={styles.buttonBtnWrap}>
        <Button className="fill" onClick={data ? handleUpdatePost : handleAddPost}>
          등록하기
        </Button>
      </div>
    </>
  );
};
