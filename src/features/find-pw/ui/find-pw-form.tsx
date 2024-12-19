'use client';

import styles from './find-pw-form.module.css';
import { Button, Input, auth, checkRegex } from '@/shared';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useCallback, useState } from 'react';

export const FindPwForm = () => {
  const [formCheck, setFormCheck] = useState(false);

  // 비밀번호 찾기
  const formSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const formData = new FormData(e.currentTarget);
        const userId = formData.get('id')?.toString() ?? '';

        if (userId) {
          await sendPasswordResetEmail(auth, userId);
          alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
        }
      } catch (e) {
        alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
        console.log(e);
      }
    },
    [formCheck]
  );

  const handleFormCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkRegexp = checkRegex('id', e.target.value);
    setFormCheck(checkRegexp);
  };

  return (
    <>
      <h2>비밀번호 재설정</h2>
      <form onSubmit={formSubmit} className={styles.form}>
        <Input
          placeholder="회원가입시 입력한 이메일을 입력해주세요."
          name="id"
          isVaild={formCheck}
          onChange={handleFormCheck}
          errorMsg="이메일 형식이 아닙니다."
        />
        <Button type="submit" className="fill" disabled={!formCheck}>
          비밀번호 재설정
        </Button>
      </form>
    </>
  );
};
