import styles from './style.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
}

export const Input = ({ value, ...rest }: InputProps) => {
  return <input className={styles.input} autoComplete="on" defaultValue={value} {...rest} />;
};
