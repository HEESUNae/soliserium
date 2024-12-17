import { Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styles from './page.module.css';
import { GoogleBtn, KakaoBtn, LoginForm } from '@/features';
import { Logo } from '@/widgets';

export default function Login() {
  return (
    <main className={styles.main}>
      <Logo size="big" />
      <LoginForm />
      <div className={styles.snsBtnsWrap}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_KEY as string}>
          <GoogleBtn />
        </GoogleOAuthProvider>
        <Suspense>
          <KakaoBtn />
        </Suspense>
      </div>
    </main>
  );
}
