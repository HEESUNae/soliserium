import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import styles from './facebook-btn.module.css';

export const FacebookBtn = () => {
  return (
    <Button>
      <div className={styles.facebookBtn}>
        <Image src="/icons/logo-facebook.svg" alt="" width={20} height={20} />
        <p>Facebook 로그인</p>
      </div>
    </Button>
  );
};
