import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${hakgyoansim.variable}`}>{children}</body>
    </html>
  );
}
