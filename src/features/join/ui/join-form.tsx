'use client';

import { Button, File, Input, checkRegex } from '@/shared';
import { Loading } from '@/widgets';
import styles from './join-form.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage, updateUser } from '../model/join-form';

export const JoinForm = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formChcek, setFormCheck] = useState<Record<string, boolean>>({ profile: false, uid: false, name: false, pw: false });
  const [uploadImg, setUploadImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('uid')?.toString() ?? '';
      const userPW = formData.get('pw')?.toString() ?? '';
      const userName = formData.get('name')?.toString() ?? '';
      const userProfile = formData.get('profile') as File;

      await updateUser(userId, userPW, userName, userProfile);

      router.push('/login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`${errorMsg}`);
      }
      setDisabled(true);
      setUploadImg('');
      setFormCheck({ profile: false, uid: false, name: false, pw: false });
    } finally {
      setIsLoading(false);
    }
  };

  // 정규식 체크하기
  const handleUpdateCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
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
        <Input placeholder="이메일" name="uid" isVaild={formChcek.uid} onChange={handleUpdateCheck} errorMsg="이메일 형식이 아닙니다." />
        <Input
          type="password"
          placeholder="비밀번호 (영어 또는 숫자 6글자 이상)"
          name="pw"
          isVaild={formChcek.pw}
          onChange={handleUpdateCheck}
          errorMsg="영어, 숫자로 6글자 이상 입력해주세요."
        />
        <Button type="submit" className="fill" disabled={disabled}>
          가입하기
        </Button>
      </form>
    </div>
  );
};
