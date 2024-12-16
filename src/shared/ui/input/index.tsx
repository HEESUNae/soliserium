import { useState } from 'react';
import styles from './style.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  isRegexp?: boolean;
  errorMsg?: string;
  onChange?: (name: string, value: string) => void;
}

export const Input = ({ value, isRegexp, errorMsg, onChange, ...rest }: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  // 정규식 체크
  const checkRegexp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.name, e.target.value);
  };

  return (
    <>
      <input
        className={isRegexp || !errorMsg || !inputValue ? styles.input : styles.errorInput}
        defaultValue={value}
        onChange={checkRegexp}
        autoComplete="on"
        {...rest}
      />
      {errorMsg && !isRegexp && inputValue && <p className={styles.error}>{errorMsg}</p>}
    </>
  );
};
