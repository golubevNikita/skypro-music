import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import ToastWrapper from '@/components/ToastWrapper/ToastWrapper';

import ReduxProvider from '@/store/ReduxProvider';

import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'skypro-music',
  description: 'skypro-music',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${montserrat.variable}`}>
          {children}

          <ToastWrapper />
        </body>
      </html>
    </ReduxProvider>
  );
}
