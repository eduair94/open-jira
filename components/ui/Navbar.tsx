'use client';

import { UIContext } from '@/context/ui';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useContext } from 'react';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={openSideMenu}
          size="large"
          edge="start"
          sx={{ color: 'white' }}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          <Typography variant="h6">OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
