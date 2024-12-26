'use client';

import styles from './layout.module.css';
import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import { Logout, PostAdd } from '@/features';
import { BottomNav, Header, Logo } from '@/widgets';
import { useAlramStore } from '@/shared/model/alram-store';
import Link from 'next/link';
import { fetchAllMail } from '@/features/mail/api/get-all-mail';
import { DocumentData } from 'firebase/firestore';
import { useUserAuthStore } from '@/entities';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAlram, setIsAlram } = useAlramStore();
  const { userAuth } = useUserAuthStore();

  // 읽지않은 메일이 있는지 확인
  useEffect(() => {
    const getMail = async () => {
      const data = await fetchAllMail();
      if (data) {
        const receiveData = data?.filter((item: DocumentData) => item.receiveUserUid === userAuth.uid);
        const isAlram = receiveData.some((item: DocumentData) => item.mailCheck === false);
        setIsAlram(isAlram);
      }
    };
    getMail();
  }, [userAuth]);

  return (
    <>
      <Header className="between">
        <Logo />
        <div className={styles.rightBtnWrap}>
          <Link href="/mail">
            <Image src={isAlram ? 'icons/nav/alram-add.svg' : '/icons/nav/alram.svg'} alt="" width={24} height={24} />
          </Link>
          <Logout />
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
