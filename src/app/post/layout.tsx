import { ReactNode } from 'react';
import { BackBtn, Header, Logo } from '@/widgets';

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
