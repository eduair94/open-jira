'use client';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { FC, ReactNode } from 'react';
import { darkTheme } from '@/themes';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {/* <Progress /> */}
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </>
);
