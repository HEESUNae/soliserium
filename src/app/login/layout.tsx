import { ReactNode, Suspense } from 'react';
import Script from 'next/script';
import { Loading } from '@/widgets';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Script async src="https://developers.kakao.com/sdk/js/kakao.js" />
    </>
  );
}
