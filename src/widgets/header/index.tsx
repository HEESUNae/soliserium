import { ReactNode } from 'react';
import styles from './style.module.css';

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Header = ({ left, right, children, className }: HeaderProps) => {
  return (
    <header className={`${styles.header} ${styles[className!]}`}>
      {left}
      {children}
      {right}
    </header>
  );
};
