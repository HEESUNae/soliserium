'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './login-form.module.css';
import { Button, Checkbox, Input } from '@/shared';
import { useIdSaveStore } from '@/entities';

export const LoginForm = () => {
  const { savedId, setSavedId } = useIdSaveStore();

  const [idValue, setIdValue] = useState<string>('');
  const checkboxRef = useRef<{ isChecked: boolean }>({ isChecked: false });

  // 로그인
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = new FormData(e.currentTarget).get('userId')?.toString() || '';
      const isChecked = checkboxRef.current.isChecked;
      // 아이디저장 혹은 저장값 삭제
      isChecked && userId ? setSavedId(userId) : useIdSaveStore.persist.clearStorage();
      //todo: 여기에 파이어베이스 로그인 로직 추가
    } catch (e) {
      console.log(e);
    }
  };

  // 페이지 진입시 아이디저장 확인 여부
  useEffect(() => {
    setIdValue(savedId || '');
  }, [savedId]);

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={formSubmit}>
          <Input placeholder="이메일" name="userId" value={idValue} />
          <Input type="password" placeholder="비밀번호" name="userPw" />
          <Button type="submit" className="fill">
            로그인
          </Button>
        </form>
      </div>
      <div className={styles.authBtnWrap}>
        <Checkbox name="idSave" className="small" checked={!!savedId} ref={checkboxRef}>
          <p>이메일 저장</p>
        </Checkbox>
        <Link href={'/auth/join'}>회원가입</Link>
        <Link href={'/auth/find/pw'}>비밀번호 찾기</Link>
      </div>
    </>
  );
};
