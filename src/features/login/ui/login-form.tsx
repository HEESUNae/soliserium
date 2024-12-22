'use client';

import { Button, Checkbox, Input } from '@/shared';
import Link from 'next/link';
import { userUserLogin } from '../model/user-login';
import styles from './login-form.module.css';

export const LoginForm = () => {
  const { formSubmit, idValue, isChecked, handleCheckboxChange } = userUserLogin();

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
