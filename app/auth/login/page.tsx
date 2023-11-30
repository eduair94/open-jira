'use client';

import { Box, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={() => signIn()} variant="outlined">
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
