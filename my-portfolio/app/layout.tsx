import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Preloader from '@/app/components/Preloader';
import Cursor from '@/app/components/Cursor';

export const metadata: Metadata = {
  title: 'Ali Qadri — Portfolio',
  description: 'Web Designer & Developer based in Karachi, Pakistan',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Cursor />
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}