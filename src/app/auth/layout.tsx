import { BackBtn, Header, Logo } from '@/widgets';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
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
