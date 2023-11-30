'use client';

import { UIContext } from '@/context/ui';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={openSideMenu}
            size="large"
            edge="start"
            sx={{ color: 'white' }}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Link
            href="/"
            style={{ color: 'white', textDecoration: 'none', marginLeft: 2 }}
          >
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </div>
        <Button color="inherit" variant="outlined" onClick={() => signOut()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
