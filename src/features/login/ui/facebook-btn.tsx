import Image from 'next/image';
import styles from './facebook-btn.module.css';
import { Button } from '@/shared';

export const FacebookBtn = () => {
  return (
    <Button>
      <div className={styles.facebookBtn}>
        <Image src="/icons/logo-facebook.svg" alt="" width={20} height={20} />
        <p>Sign in width Facebook</p>
      </div>
    </Button>
  );
};
