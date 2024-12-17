import Image from 'next/image';
import { SetStateAction } from 'react';
import styles from './style.module.css';

interface FileProps {
  onChange: (name: string, value: string) => void;
  name?: string;
  isVaild?: boolean;
  uploadImg: string;
  setUploadImg: React.Dispatch<SetStateAction<string>>;
}

export const File = ({ onChange, isVaild, name, uploadImg, setUploadImg }: FileProps) => {
  const handleFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;

      // HEIF 파일인지 확인
      if (fileType === 'image/heif' || fileType === 'image/heic') {
        alert('HEIF 형식은 지원되지 않습니다.');
        e.target.value = ''; // 파일 선택 초기화
        return;
      }

      // 이미지 파일이 아닌 경우
      if (!fileType.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        e.target.value = ''; // 파일 선택 초기화
        return;
      }

      // 이미지 미리보기
      const fileURL = URL.createObjectURL(file);
      setUploadImg(fileURL);
    }
    onChange?.(e.target.name, e.target.value);
  };

  return (
    <div className={styles.fileWrap}>
      <div className={styles.file}>
        <input type="file" id="file" name={name} onChange={handleFileValue} multiple={false} accept="image/jpeg, image/png, image/webp" />
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
