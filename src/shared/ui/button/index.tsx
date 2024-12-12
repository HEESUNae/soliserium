import { ReactNode } from 'react';
import styles from './style.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({ type = 'button', onClick, children, className, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={`${styles.btn} ${styles[className!]}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
