import { Header, Logo } from '@/widgets';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      {children}
    </>
  );
}
