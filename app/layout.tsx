import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const display = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sprechstunde',
  description: 'Deutsch üben — dein KI-Gesprächspartner für den Schweizer Alltag.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1E3D2F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
