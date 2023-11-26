'use client';

import { ThemeLayout } from '@/components/layouts';
import { EntriesProvider } from '@/context/entries';
import { UIProvider } from '@/context/ui';
import CssBaseline from '@mui/material/CssBaseline';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  entries: string;
}

export const Providers: FC<Props> = ({ children, entries }) => (
  <>
    {/* <Progress /> */}
    <EntriesProvider entries={entries}>
      <UIProvider>
        <ThemeLayout>
          <CssBaseline />
          {children}
        </ThemeLayout>
      </UIProvider>
    </EntriesProvider>
  </>
);
