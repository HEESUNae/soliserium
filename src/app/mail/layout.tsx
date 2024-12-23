'use client';

import { BackBtn, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';

interface MailLayoutProps {
  children: ReactNode;
}

export default function MailLayout({ children }: MailLayoutProps) {
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
