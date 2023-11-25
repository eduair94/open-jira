'use client';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { FC, ReactNode } from 'react';
import { EntriesProvider } from '@/context/entries';
import { UIProvider } from '@/context/ui';
import { darkTheme } from '@/themes';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {/* <Progress /> */}
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  </>
);
