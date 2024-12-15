import Image from 'next/image';
import styles from './style.module.css';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
    </div>
  );
};
