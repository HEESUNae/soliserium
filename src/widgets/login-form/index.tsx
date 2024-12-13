'use client';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useIdSaveStore } from '@/entities/auth/model/id-save-store';

export const LoginForm = () => {
  const { savedId, setSavedId } = useIdSaveStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [idValue, setIdValue] = useState('');

  // 로그인
  const authLogin = (formData: FormData) => {
    try {
      const userId = formData.get('userId')?.toString()!;
      if (isChecked) setSavedId(userId);
    } catch (e) {
      console.log(e);
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

  // 아이디저장 취소
  useEffect(() => {
    if (savedId && !isChecked) {
      useIdSaveStore.persist.clearStorage();
    }
  }, [isChecked]);

  return (
    <>
      <div className={styles.form}>
        <form action={authLogin}>
          <Input placeholder="아이디" name="userId" value={idValue} />
          <Input type="password" placeholder="비밀번호" name="userPw" />
          <Button type="submit" className="fill">
            로그인
          </Button>
        </form>
      </div>
      <div className={styles.authBtnWrap}>
        <Checkbox name="idSave" className="small" checked={isChecked} onChange={handleCheckbox}>
          <p>아이디 저장</p>
        </Checkbox>
        <Button>회원가입</Button>
        <Button>비밀번호 찾기</Button>
      </div>
    </>
  );
};
