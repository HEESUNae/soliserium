import styles from './style.module.css';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      <p>관심을 전달하는중</p>
    </div>
  );
};
