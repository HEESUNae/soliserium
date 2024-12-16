'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import styles from './join-form.module.css';
import { authJoinAction } from '../actions/auth-join-action';
import { checkRegex, getErrorMessage } from '../model/auth-join';
import { Button, Input, auth } from '@/shared';

export const JoinForm = () => {
  const [formState, formAction] = useActionState(authJoinAction, null);
  const [disabled, setDisabled] = useState(true);
  const [formChcek, setFormCheck] = useState({ id: false, pw: false });
  const router = useRouter();

  // 회원가입
  const authJoin = async () => {
    try {
      if (formState?.status && formState.data) {
        await createUserWithEmailAndPassword(auth, formState.data?.userId, formState.data?.userPW);
        alert('회원가입에 성공했습니다.');
        router.push('/login');
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`회원가입에 실패했습니다. ${errorMsg}`);
      }
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

  // 폼 제출하면 파이어베이스 회원가입 진행
  useEffect(() => {
    if (formState) authJoin();
  }, [formState]);

  return (
    <div className={styles.joinFormWrap}>
      <form action={formAction}>
        <Input placeholder="이메일" name="id" isRegexp={formChcek.id} onChange={handleUpdateCheck} errorMsg="이메일 형식이 아닙니다." />
        <Input
          placeholder="비밀번호 (영어 또는 숫자 6글자 이상)"
          name="pw"
          isRegexp={formChcek.pw}
          onChange={handleUpdateCheck}
          errorMsg="영어 또는 숫자로 6글자 이상 입력해주세요."
        />
        <Button type="submit" className="fill" disabled={disabled}>
          회원가입
        </Button>
      </form>
    </div>
  );
};
