import { Button } from '../../shared/ui/button';
import styles from './style.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Button className="back">
        <img src="/icons/arrow-back.svg" alt="뒤로가기" />
      </Button>
      <img src="/icons/logo.svg" alt="soliserium" width={120} />
    </header>
  );
};
