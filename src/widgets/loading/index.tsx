import Image from 'next/image';
import styles from './style.module.css';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src="/images/loading.gif" alt="" width={160} height={160} />
    </div>
  );
};
