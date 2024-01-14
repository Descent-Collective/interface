import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import App from './app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Descent Protocol',
  description: 'Descentralized Lending Protocol for Frontier Markets',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Descent Protocol',
    description: 'Descentralized Lending Protocol for Frontier Markets',
    url: 'https://testnet.descentdao.com',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1705262703/descent_aqr69d.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'testnet.descentdao.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://testnet.descentdao.com',
    title: 'Descent Protocol',
    description: 'Descentralized Lending Protocol for Frontier Markets',
    images: [
      {
        url: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1705262703/descent_aqr69d.png',
        width: 1200,
        height: 630,
      },
    ],
  },
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
