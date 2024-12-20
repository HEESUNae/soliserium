import styles from './style.module.css';

interface TextareaProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({ placeholder, onChange }: TextareaProps) => {
  return (
    <>
      <textarea className={styles.textarea} placeholder={placeholder} onChange={onChange} />
    </>
  );
};
