import { fetchLucky } from '@/entities/lucky/api/get-lucky';
import styles from './page.module.css';

export default async function LuckyPage() {
  const luckyList = await fetchLucky();

  if (!luckyList) return <></>;

  return (
    <>
      <div className={styles.luckyBox}>
        <h3>{luckyList?.author}</h3>
        <p className={styles.authorProfile}>{luckyList?.authorProfile}</p>
        <p className={styles.message}>{luckyList?.message}</p>
      </div>
    </>
  );
}
