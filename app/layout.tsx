import { ReactNode } from 'react';

import GlobalNavigationBar from '@components/GlobalNavigationBar/GlobalNavigationBar';
import ModalContainer from '@components/Modal/ModalContainer';

import WrapperProvider from '@utils/WrapperProvider';

import '@styles/global-styles/global.scss';
import styles from './RootLayout.module.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여행자들을 위한 실시간 정보, BLOB',
  description: '여행자들을 위한 실시간 정보, BLOB',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body suppressHydrationWarning className={styles.main}>
        <WrapperProvider>
          <ModalContainer />
          <GlobalNavigationBar />
          {children}
        </WrapperProvider>
      </body>
    </html>
  );
}
