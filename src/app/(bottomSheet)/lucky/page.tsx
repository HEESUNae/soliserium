'use client';

import { fetcSaying } from '@/entities/lucky/api/get-saying';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { fetchLucky } from '@/entities/lucky/api/get-lucky';
import { DocumentData } from 'firebase/firestore';

export default function LuckyPage() {
  const [sayingList, setSayingList] = useState<null | DocumentData>(null);
  useEffect(() => {
    const getSaying = async () => {
      const sayingData = await fetcSaying();
      setSayingList(sayingData);

      const data = await fetchLucky();
      console.log(data);
    };
    getSaying();
  }, []);

  if (!sayingList) return <></>;

  return (
    <div className={styles.main}>
      <div className={styles.sayingBoxWrap}>
        <h2>랜덤 명언</h2>
        <div className={styles.sayingBox}>
          <h3>{sayingList?.author}</h3>
          <p className={styles.authorProfile}>{sayingList?.authorProfile}</p>
          <p className={styles.message}>{sayingList?.message}</p>
        </div>
      </div>
      <div className={styles.luckyWrap}>
        <h2>별자리 운세</h2>
      </div>
    </div>
  );
}
