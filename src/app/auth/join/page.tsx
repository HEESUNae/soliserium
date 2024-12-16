import { JoinForm } from '@/features';
import styles from './page.module.css';

export default function JoinPage() {
  return (
    <main className={styles.main}>
      <h2>회원가입</h2>
      <JoinForm />
    </main>
  );
}
