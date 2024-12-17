'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './join-form.module.css';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Input, File } from '@/shared';
import { auth, db } from '@/shared/providers/firebase';
import { getProfileImg } from '../api/upload-img';
import { checkRegex, getErrorMessage } from '../model/auth-join';
import { Loading } from '@/widgets';

export const JoinForm = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formChcek, setFormCheck] = useState<Record<string, boolean>>({ profile: false, id: false, name: false, pw: false });
  const [uploadImg, setUploadImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // 회원가입
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('id')?.toString() || '';
      const userPW = formData.get('pw')?.toString() || '';
      const userName = formData.get('name')?.toString() || '';
      const userProfile = formData.get('profile');

      // 회원 생성
      const userCredential = await createUserWithEmailAndPassword(auth, userId, userPW);
      const user = userCredential.user;

      // 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
      const profileImg = await getProfileImg(userProfile as File);

      // 회원 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        name: userName,
        photoURL: profileImg.url,
        providerId: user.providerId,
      });
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`회원가입에 실패했습니다. ${errorMsg}`);
        // 리셋
        setDisabled(true);
        setUploadImg('');
        setFormCheck({ profile: false, id: false, name: false, pw: false });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 정규식 체크하기
  const handleUpdateCheck = (name: string, value: string) => {
    const isValid = checkRegex(name, value);
    setFormCheck((prev) => ({ ...prev, [name]: isValid }));
  };

  // 정규식 체크를 모두 통과하면 회원가입 버튼 활성화
  useEffect(() => {
    const allVaild = Object.values(formChcek).every(Boolean);
    setDisabled(!allVaild);
  }, [formChcek]);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.joinFormWrap}>
      <form onSubmit={formSubmit}>
        <div className={styles.profileWrap}>
          <File name="profile" isVaild={formChcek.profile} onChange={handleUpdateCheck} uploadImg={uploadImg} setUploadImg={setUploadImg} />
        </div>
        <Input
          placeholder="이름"
          name="name"
          isVaild={formChcek.name}
          onChange={handleUpdateCheck}
          errorMsg="영어, 한글 이름 형식으로 입력해주세요."
        />
        <Input placeholder="이메일" name="id" isVaild={formChcek.id} onChange={handleUpdateCheck} errorMsg="이메일 형식이 아닙니다." />
        <Input
          placeholder="비밀번호 (영어 또는 숫자 6글자 이상)"
          name="pw"
          isVaild={formChcek.pw}
          onChange={handleUpdateCheck}
          errorMsg="영어, 숫자로 6글자 이상 입력해주세요."
        />
        <Button type="submit" className="fill" disabled={disabled}>
          회원가입
        </Button>
      </form>
    </div>
  );
};
