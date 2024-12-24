import { ReactNode } from 'react';
import styles from './style.module.css';

interface RadioProps {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: ReactNode;
  disabled?: boolean;
}

export const Radio = ({ name, value, defaultChecked, children, ...rest }: RadioProps) => {
  return (
    <div className={styles.radio}>
      <input type="radio" id={`${name}-${value}`} value={value} name={name} defaultChecked={defaultChecked} {...rest} />
      <label htmlFor={`${name}-${value}`}>{children}</label>
    </div>
  );
};
