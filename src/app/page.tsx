import Image from 'next/image';
import styles from './page.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/shared/providers/firebase';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { GoogleBtn } from './login/(ui)/google-btn';
import { AppleBtn } from './login/(ui)/apple-btn';
import { FacebookBtn } from './login/(ui)/facebook-btn';

//TODO: middleware 작업하기
export default function Home() {
  // const test = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'users'), {
  //       first: 'Ada',
  //       last: 'Lovelace',
  //       born: 1815,
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

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
