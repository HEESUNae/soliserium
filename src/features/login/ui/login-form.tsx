'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './login-form.module.css';
import { Button, Checkbox, Input } from '@/shared';
import { useIdSaveStore } from '@/entities';

export const LoginForm = () => {
  const { savedId, setSavedId } = useIdSaveStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [idValue, setIdValue] = useState('');

  // 로그인
  const authLogin = (formData: FormData) => {
    try {
      const userId = (formData.get('userId') || '').toString();
      checkIdSave(userId);
    } catch (e) {
      console.log(e);
    }
  };

  // 폼 제출시 아이디저장
  const checkIdSave = (userId: string) => {
    if (isChecked && userId.length) {
      setSavedId(userId);
    } else {
      useIdSaveStore.persist.clearStorage();
    }
  };

  // 아이디저장 체크박스 이벤트 핸들러
  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  // 아이디저장 값, 체크박스 선택
  useEffect(() => {
    setIsChecked(!!savedId);
    setIdValue(savedId || '');
  }, [savedId]);

  return (
    <>
      <div className={styles.form}>
        <form action={authLogin}>
          <Input placeholder="ID" name="userId" value={idValue} />
          <Input type="password" placeholder="PW" name="userPw" />
          <Button type="submit" className="fill">
            Login
          </Button>
        </form>
      </div>
      <div className={styles.authBtnWrap}>
        <Checkbox name="idSave" className="small" checked={isChecked} onChange={handleCheckbox}>
          <p>Save ID</p>
        </Checkbox>
        <Link href={'/auth/join'}>Join</Link>
        <Link href={'/auth/find/pw'}>Find Password</Link>
      </div>
    </>
  );
};
