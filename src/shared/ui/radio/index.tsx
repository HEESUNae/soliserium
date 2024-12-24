import { ReactNode } from 'react';
import styles from './style.module.css';

interface RadioProps {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
}

export const Radio = ({ name, value, defaultChecked, onChange, children, ...rest }: RadioProps) => {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={`${name}-${value}`}
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(name, e.target.value)}
        {...rest}
      />
      <label htmlFor={`${name}-${value}`}>{children}</label>
    </div>
  );
};
