'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import styles from './layout.module.css';
import { Logout, PostAdd } from '@/features';
import { Button } from '@/shared';
import { BottomNav, Header, Logo } from '@/widgets';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header className="between">
        <Logo />
        <div className={styles.rightBtnWrap}>
          <Logout />
          <Button>
            <Image src="/icons/nav/alram.svg" alt="" width={24} height={24} />
          </Button>
          <Button>
            <Image src="/icons/nav/setting.svg" alt="" width={24} height={24} />
          </Button>
        </div>
      </Header>
      {children}
      <AnimatePresence>
        <PostAdd />
      </AnimatePresence>
      <BottomNav />
    </>
  );
}
