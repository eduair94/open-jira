import { Layout } from '@/components/layouts';
import { entriesServer } from '@/context/entries/entriesServer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home - Open Jira App',
  description: 'Open Jira App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const entries = await entriesServer();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.className}>
        <Providers entries={entries}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
