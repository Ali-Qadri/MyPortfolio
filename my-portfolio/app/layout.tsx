import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import SmoothScroll from '@/app/components/SmoothScroll';
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
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}