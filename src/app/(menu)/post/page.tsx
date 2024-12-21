'use client';

import { Suspense } from 'react';
import styles from './page.module.css';
import { PostInfo } from './post-info';

export default function PostViewPage() {
  return (
    <main className={styles.main}>
      <Suspense>
        <PostInfo />
      </Suspense>
    </main>
  );
}
