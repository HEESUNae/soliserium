import { ReactNode } from 'react';
import Script from 'next/script';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
      <Script async src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" />
    </>
  );
}
