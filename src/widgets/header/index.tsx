import { ReactNode } from 'react';
import styles from './style.module.css';

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}

export const Header = ({ left, right, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {left}
      {children}
      {right}
    </header>
  );
};
