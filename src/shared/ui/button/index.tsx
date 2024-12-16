import React, { ReactNode } from 'react';
import styles from './style.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({ type = 'button', onClick, children, className, disabled, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${disabled ? styles.disbaled : styles[className!]}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
