import { Header, Logo } from '@/widgets';
import Script from 'next/script';
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
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </>
  );
}
