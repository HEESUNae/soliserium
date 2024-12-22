import { useUserAuthStore, usePostWrite } from '@/entities';
import { Button, Textarea } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import { DocumentData } from 'firebase/firestore';
import styles from './post-write.module.css';

interface PostWriteProps {
  data?: DocumentData;
  onClick?: () => void;
}

export const PostWrite = ({ data }: PostWriteProps) => {
  const { handleTextareaValue, handleUpdatePost, handleAddPost } = usePostWrite(data || {});
  const { userAuth } = useUserAuthStore();

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
