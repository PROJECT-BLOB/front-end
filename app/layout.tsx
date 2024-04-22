import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: '여행자들을 위한 실시간 정보, BLOB',
  description: '여행자들을 위한 실시간 정보, BLOB',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
