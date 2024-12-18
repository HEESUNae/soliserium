import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/shared/providers/auth-provider';

const pretendard = localFont({
  src: '../shared/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const hakgyoansim = localFont({
  src: '../shared/fonts/Hakgyoansim-Dunggeunmiso-Bold.otf',
  display: 'swap',
  weight: '45 920',
  variable: '--font-hakgyoansim',
});

export const metadata: Metadata = {
  title: 'Soliserium',
  description: '위로와 안식을 주는 공간',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
      </head>
      <body className={`${pretendard.variable} ${hakgyoansim.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
