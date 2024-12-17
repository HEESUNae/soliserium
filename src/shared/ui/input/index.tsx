import { useState } from 'react';
import styles from './style.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  isVaild?: boolean;
  errorMsg?: string;
  onChange?: (name: string, value: string) => void;
}

export const Input = ({ value, isVaild, errorMsg, onChange, ...rest }: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  // 정규식 체크
  const checkRegexp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.name, e.target.value);
  };

  return (
    <div>
      <input
        className={isVaild || !inputValue || !errorMsg ? styles.input : styles.errorInput}
        defaultValue={value}
        onChange={checkRegexp}
        autoComplete="off"
        {...rest}
      />
      {errorMsg && !isVaild && inputValue && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};
