'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from './style.module.css';

interface CheckboxProps {
  name: string;
  className?: string;
  children: ReactNode;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const Checkbox = ({ name, className, checked, onChange, children, ...rest }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 아이디저장 체크박스 이벤트 핸들러
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
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
