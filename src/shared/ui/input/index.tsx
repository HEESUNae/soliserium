import styles from './style.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
}

export const Input = ({ ...rest }: InputProps) => {
  return <input {...rest} className={styles.input} />;
};
