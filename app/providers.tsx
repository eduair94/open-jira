'use client';

import { ThemeLayout } from '@/components/layouts';
import { EntriesProvider } from '@/context/entries';
import { UIProvider } from '@/context/ui';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { SnackbarProvider } from 'notistack';
import * as NProgress from 'nprogress';
import { FC, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  const currentPage = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [currentPage]);
  return (
    <>
      <SessionProvider>
        <NextTopLoader />
        <SnackbarProvider>
          <EntriesProvider>
            <UIProvider>
              <ThemeLayout>
                <CssBaseline />
                {children}
              </ThemeLayout>
            </UIProvider>
          </EntriesProvider>
        </SnackbarProvider>
      </SessionProvider>
    </>
  );
};
