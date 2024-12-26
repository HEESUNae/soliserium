'use client';

import { Button, Input, checkRegex } from '@/shared';
import styles from './find-pw-form.module.css';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { fetchFindPw } from '../api/find-pw';

export const FindPwForm = () => {
  const router = useRouter();
  const [formCheck, setFormCheck] = useState(false);

  // 비밀번호 찾기
  const formSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const formData = new FormData(e.currentTarget);
        const userId = formData.get('uid')?.toString() ?? '';

        if (userId) {
          await fetchFindPw(userId);
          alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
          router.push('/login');
        }
      } catch (e) {
        alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
        console.log(e);
      }
    },
    [formCheck]
  );

  // 정규식 체크
  const handleFormCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkRegexp = checkRegex('uid', e.target.value);
    setFormCheck(checkRegexp);
  };

  return (
    <form onSubmit={formSubmit} className={styles.form}>
      <Input
        placeholder="회원가입시 입력한 이메일을 입력해주세요."
        name="uid"
        isVaild={formCheck}
        onChange={handleFormCheck}
        errorMsg="이메일 형식이 아닙니다."
      />
      <Button type="submit" className="fill" disabled={!formCheck}>
        비밀번호 재설정
      </Button>
    </form>
  );
};
