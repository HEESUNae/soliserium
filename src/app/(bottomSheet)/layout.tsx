import { BackBtn, BottomNav, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { PostAdd } from '@/features';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <BackBtn />
        <Logo />
      </Header>
      {children}
      <AnimatePresence>
        <PostAdd />
      </AnimatePresence>
      <BottomNav />
    </>
  );
}
