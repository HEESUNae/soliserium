'use client';

import { ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import styles from './style.module.css';

interface CheckboxProps {
  name: string;
  className?: string;
  children: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  ref?: any;
}

export const Checkbox = ({ name, className, checked, children, ref, ...rest }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 부모에게 현재 체크값 넘겨주기
  useImperativeHandle(ref, () => ({
    isChecked,
  }));

  // 아이디저장 체크박스 이벤트 핸들러
  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  // 체크박스 값 변경
  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  return (
    <div className={`${styles.checkbox} ${styles[className!]}`}>
      <input type="checkbox" id={name} checked={isChecked} onChange={handleCheckbox} {...rest} />
      <label htmlFor={`${name}`}>{children}</label>
    </div>
  );
};
