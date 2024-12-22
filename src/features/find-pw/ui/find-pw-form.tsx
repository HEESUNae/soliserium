'use client';

import { Button, Input } from '@/shared';
import { useFindPw } from '../model/find-pw';
import styles from './find-pw-form.module.css';

export const FindPwForm = () => {
  const { formSubmit, formCheck, handleFormCheck } = useFindPw();

  return (
    <>
      <h2>비밀번호 재설정</h2>
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
    </>
  );
};
