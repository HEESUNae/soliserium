import { ReactNode } from 'react';
import styles from './style.module.css';

interface NotDataProps {
  children: ReactNode;
}

export function NotData({ children }: NotDataProps) {
  return <div className={styles.notData}>{children}</div>;
}
