import Image from 'next/image';
import { SetStateAction } from 'react';
import styles from './style.module.css';

interface FileProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isVaild?: boolean;
  uploadImg: string;
  setUploadImg: React.Dispatch<SetStateAction<string>>;
}

export const File = ({ onChange, isVaild, name, uploadImg, setUploadImg }: FileProps) => {
  const handleFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 미리보기
      const fileURL = URL.createObjectURL(file);
      setUploadImg(fileURL);
    }
    onChange?.(e);
  };

  return (
    <div className={styles.fileWrap}>
      <div className={styles.file}>
        <input type="file" id="file" name={name} onChange={handleFileValue} multiple={false} />
        <label htmlFor="file">
          <Image
            src={uploadImg || '/images/user-default.png'}
            className={uploadImg ? styles.uploadImg : styles.defaultImg}
            width={100}
            height={100}
            alt=""
          />
        </label>
      </div>
      {!isVaild && <p className={styles.error}>아이콘을 선택해 프로필 사진으로 등록하세요.</p>}
    </div>
  );
};
