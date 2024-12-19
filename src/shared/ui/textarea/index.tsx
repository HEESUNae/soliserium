import styles from './style.module.css';

interface TextareaProps {
  placeholder?: string;
}

export const Textarea = ({ placeholder }: TextareaProps) => {
  return (
    <>
      <textarea className={styles.textarea} placeholder={placeholder} />
    </>
  );
};
