import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import App from './app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Descent Protocol',
  description: 'Descentralized Lending Protocol for Frontier Markets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <App>{children}</App>
      </body>
    </html>
  );
}
