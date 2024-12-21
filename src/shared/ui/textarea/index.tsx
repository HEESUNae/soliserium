import styles from './style.module.css';

interface TextareaProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  value?: string;
}

export const Textarea = ({ placeholder, onChange, value, ...rest }: TextareaProps) => {
  return (
    <>
      <textarea className={styles.textarea} placeholder={placeholder} onChange={onChange} defaultValue={value} {...rest} />
    </>
  );
};
