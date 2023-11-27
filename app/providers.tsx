'use client';

import { ThemeLayout } from '@/components/layouts';
import { EntriesProvider } from '@/context/entries';
import { UIProvider } from '@/context/ui';
import CssBaseline from '@mui/material/CssBaseline';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => (
  <>
    {/* <Progress /> */}
    <EntriesProvider>
      <UIProvider>
        <ThemeLayout>
          <CssBaseline />
          {children}
        </ThemeLayout>
      </UIProvider>
    </EntriesProvider>
  </>
);
