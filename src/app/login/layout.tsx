import { ReactNode } from 'react';
import Script from 'next/script';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </>
  );
}
