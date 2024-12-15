import { BackBtn, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';
import styles from './page.module.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <div className={styles.headerLeft}>
          <BackBtn />
        </div>
        <Logo />
      </Header>
      {children}
    </>
  );
}
