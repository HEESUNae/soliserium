import { useUserAuthStore, usePostWrite } from '@/entities';
import { Button, Textarea } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import { DocumentData } from 'firebase/firestore';
import styles from './post-write.module.css';

interface PostWriteProps {
  postData?: DocumentData;
  mode?: string;
  onClick?: () => void;
}

export const PostWrite = ({ postData = {}, mode = 'add' }: PostWriteProps) => {
  const { handleTextareaValue, handleUpdatePost, handleAddPost } = usePostWrite(postData, mode);
  const { userAuth } = useUserAuthStore();

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
