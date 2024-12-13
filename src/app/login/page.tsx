import styles from './page.module.css';
import { GoogleBtn, LoginForm, FacebookBtn, AppleBtn } from '@/features';
import { Logo } from '@/widgets';

export default function Login() {
  return (
    <main className={styles.main}>
      <Logo size="big" />
      <LoginForm />
      <div className={styles.snsBtnsWrap}>
        <GoogleBtn />
        <FacebookBtn />
        <AppleBtn />
      </div>
    </main>
  );
}
