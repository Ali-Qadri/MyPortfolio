import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';

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
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}