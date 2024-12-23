'use client';

import { BackBtn, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';

interface PostLayoutProps {
  children: ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <>
      <Header>
        <BackBtn />
        <Logo />
      </Header>
      {children}
    </>
  );
}
