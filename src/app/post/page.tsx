import { Suspense } from 'react';
import styles from './page.module.css';
import { PostInfo } from '@/features';

export default function PostViewPage() {
  return (
    <main className={styles.main}>
      <Suspense>
        <PostInfo />
      </Suspense>
    </main>
  );
}
