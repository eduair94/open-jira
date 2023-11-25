import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Navbar, Sidebar } from '../ui';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => (
  <Box sx={{ flexFlow: 1 }}>
    <Navbar />
    <Sidebar />
    <Box sx={{ padding: '10px 20px' }}>{children}</Box>
  </Box>
);
