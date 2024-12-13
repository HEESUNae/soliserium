import styles from './page.module.css';
import { AppleBtn, FacebookBtn, GoogleBtn } from '.';
import { LoginForm } from '@/widgets/login-form';

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>Soliserium</div>
      <LoginForm />
      <div className={styles.snsBtnsWrap}>
        <GoogleBtn />
        <FacebookBtn />
        <AppleBtn />
      </div>
    </main>
  );
}
