'use client';
import { UIContext } from '@/context/ui';
import { darkTheme, lightTheme } from '@/themes';
import { ThemeProvider } from '@mui/material';
import { FC, ReactNode, useContext } from 'react';

export const ThemeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useContext(UIContext);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};
