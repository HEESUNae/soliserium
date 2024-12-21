import { fetchAddPost, useUserAuthStore } from '@/entities';
import { Button, Textarea } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useOpenPostAddStore } from '../model/open-post-add-store';
import styles from './post-write.module.css';

interface PostWriteProps {
  data?: DocumentData;
}

export const PostWrite = ({ data }: PostWriteProps) => {
  const { setIsOpen } = useOpenPostAddStore();
  const { userAuth } = useUserAuthStore();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleAddPost = async () => {
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
      alert('글 작성이 완료되었습니다.');
      setIsOpen(false);
    } catch (e) {
      alert('글 작성에 실패했습니다. 다시 시도해주세요.');
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
        <Button className="fill" onClick={handleAddPost}>
          등록하기
        </Button>
      </div>
    </>
  );
};
