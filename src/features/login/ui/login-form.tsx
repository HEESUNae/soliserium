'use client';

import { getErrorMessage, useIdSaveStore, useUserAuthStore } from '@/entities';
import { Button, Checkbox, Input } from '@/shared';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCheckUser } from '../model/auth-login';
import styles from './login-form.module.css';

export const LoginForm = () => {
  const { savedId, setSavedId } = useIdSaveStore();
  const [idValue, setIdValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { setUserAuth } = useUserAuthStore();

  // 로그인
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('uid')?.toString() || '';
      const userPw = formData.get('pw')?.toString() || '';

      // 기존 가입자 유저인지 확인
      const user = await getCheckUser(userId, userPw);
      if (user) {
        setUserAuth(user);
        saveUserId(userId);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`${errorMsg}`);
      }
    }
  };

  // 아이디저장 혹은 저장값 삭제
  const saveUserId = (userId: string) => {
    if (isChecked) {
      setSavedId(userId);
    } else {
      useIdSaveStore.persist.clearStorage();
    }
  };

  // 이메일저장 체크박스 핸들러
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  // 페이지 진입시 이메일저장 확인 여부
  useEffect(() => {
    setIsChecked(!!savedId);
    setIdValue(savedId || '');
  }, [savedId]);

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={formSubmit}>
          <Input placeholder="이메일" name="uid" value={idValue} />
          <Input type="password" placeholder="비밀번호" name="pw" />
          <Button type="submit" className="fill">
            로그인
          </Button>
        </form>
      </div>
      <div className={styles.authBtnWrap}>
        <Checkbox name="idSave" className="small" checked={isChecked} onChange={handleCheckboxChange}>
          <p>이메일 저장</p>
        </Checkbox>
        <Link href={'/auth/join'}>회원가입</Link>
        <Link href={'/auth/find/pw'}>비밀번호 찾기</Link>
      </div>
    </>
  );
};
