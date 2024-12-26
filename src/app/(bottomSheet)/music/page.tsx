'use client';

import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import styles from './page.module.css';
import { fetcSaying } from '@/features';
import { Movie } from '@/widgets';

export default function MusicPage() {
  const [sayingList, setSayingList] = useState<null | DocumentData>(null);

  useEffect(() => {
    const getSaying = async () => {
      const sayingData = await fetcSaying();
      setSayingList(sayingData);
    };
    getSaying();
  }, []);

  if (!sayingList) return <></>;

  return (
    <div className={styles.main}>
      <div className={styles.sayingBoxWrap}>
        <div className={styles.sayingBox}>
          <h3>{sayingList?.author}</h3>
          <p className={styles.authorProfile}>{sayingList?.authorProfile}</p>
          <p className={styles.message}>{sayingList?.message}</p>
        </div>
      </div>
      <div className={styles.musicWrap}>
        <h2>힐링 노래를 들어보는 것은 어떨까요?</h2>
        <div className={styles.musicBoxWrap}>
          <Movie videoId={'x9Jz2OueIGY'} />
          <Movie videoId={'iAEM8KGTl_E'} />
          <Movie videoId={'cS-IiArGmcU'} />
        </div>
      </div>
    </div>
  );
}
