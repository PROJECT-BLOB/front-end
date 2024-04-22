import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Metadata } from 'next';
import './globals.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <body>{children}</body>
        {/* <ReactQueryDevtools /> */}
      </html>
    </QueryClientProvider>
  );
}
