import styles from './page.module.css';
import { GoogleBtn, LoginForm, KakaoBtn, NaverBtn } from '@/features';
import { Logo } from '@/widgets';

export default function Login() {
  return (
    <main className={styles.main}>
      <Logo size="big" />
      <LoginForm />
      <div className={styles.snsBtnsWrap}>
        <GoogleBtn />
        <KakaoBtn />
        <NaverBtn />
      </div>
    </main>
  );
}
