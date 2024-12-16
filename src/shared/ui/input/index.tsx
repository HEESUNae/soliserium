import { useState } from 'react';
import styles from './style.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  regexp?: RegExp;
  errorMsg?: string;
}

export const Input = ({ value, regexp, errorMsg, ...rest }: InputProps) => {
  const [isRegexp, setIsRegexp] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  // 정규식 체크
  const checkRegexp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setInputValue(targetValue);
    if (targetValue && regexp) {
      setIsRegexp(regexp?.test(targetValue));
    }
  };

  return (
    <div className={styles.inputWrap}>
      <input
        className={isRegexp || !inputValue ? styles.input : styles.errorInput}
        defaultValue={value}
        onChange={checkRegexp}
        autoComplete="on"
        {...rest}
      />
      {errorMsg && !isRegexp && inputValue && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};
