import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Box2Box Admin Dashboard | Smart Storage & Autonomous Logistics',
  description:
    'Enterprise operations platform for Box2Box smart door-to-door storage, automated high-bay vaults, smart locker networks, and EV courier dispatch.',
  keywords: [
    'Box2Box',
    'Smart Storage',
    'Door to Door Storage',
    'Warehouse Management',
    'Locker Network',
    'Logistics Dashboard',
  ],
  authors: [{ name: 'Box2Box Engineering' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
