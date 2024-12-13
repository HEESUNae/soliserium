'use client';

import { ReactNode, useState } from 'react';
import styles from './style.module.css';

interface CheckboxProps {
  name: string;
  className?: string;
  children: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export const Checkbox = ({ name, className, checked, onChange, children, ...rest }: CheckboxProps) => {
  return (
    <div className={`${styles.checkbox} ${styles[className!]}`}>
      <input type="checkbox" id={name} checked={checked} onChange={onChange} {...rest} />
      <label htmlFor={`${name}`}>{children}</label>
    </div>
  );
};
