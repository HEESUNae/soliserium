import { BackBtn, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';
import styles from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
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
