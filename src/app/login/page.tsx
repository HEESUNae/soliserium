import styles from './page.module.css';
import { GoogleBtn, KakaoBtn, LoginForm } from '@/features';
import { Logo } from '@/widgets';
import { Suspense } from 'react';

export default function Login() {
  return (
    <main className={styles.main}>
      <Logo size="big" />
      <LoginForm />
      <div className={styles.snsBtnsWrap}>
        <GoogleBtn />
        <Suspense>
          <KakaoBtn />
        </Suspense>
      </div>
    </main>
  );
}
