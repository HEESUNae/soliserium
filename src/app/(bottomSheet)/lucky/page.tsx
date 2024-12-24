import { fetchLucky } from '@/entities/lucky/api/get-lucky';
import styles from './page.module.css';

export default async function LuckyPage() {
  const luckyList = await fetchLucky();

  if (!luckyList) return <></>;

  return (
    <div className={styles.main}>
      <div className={styles.sayingBoxWrap}>
        <h2>랜덤 명언</h2>
        <div className={styles.sayingBox}>
          <h3>{luckyList?.author}</h3>
          <p className={styles.authorProfile}>{luckyList?.authorProfile}</p>
          <p className={styles.message}>{luckyList?.message}</p>
        </div>
      </div>
      <div className={styles.luckyWrap}>
        <h2>별자리 운세</h2>
      </div>
    </div>
  );
}
