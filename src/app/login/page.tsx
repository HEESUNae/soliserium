import Image from 'next/image';
import styles from './page.module.css';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { GoogleBtn } from './(ui)/google-btn';
import { AppleBtn } from './(ui)/apple-btn';
import { FacebookBtn } from './(ui)/facebook-btn';

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image src="/icons/logo.svg" alt="" width={150} height={40} />
      </div>
      <div className={styles.form}>
        <form>
          <Input placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" className="fill">
            로그인
          </Button>
        </form>
      </div>
      <div className={styles.authBtnWrap}>
        <div className={styles.idSave}>
          <input type="checkbox" /> 아이디 저장하기
        </div>
        <Button>회원가입</Button>
        <Button>비밀번호 찾기</Button>
      </div>
      <div className={styles.snsBtnsWrap}>
        <GoogleBtn />
        <FacebookBtn />
        <AppleBtn />
      </div>
    </main>
  );
}
