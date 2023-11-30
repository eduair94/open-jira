'use client';

import { UIContext } from '@/context/ui';
import { Box, Drawer, FormControlLabel, Typography } from '@mui/material';
import { useContext } from 'react';
import { EntrySideBarList } from './EntrySideBarList';
import { MaterialUISwitch } from './MaterialUISwitch';

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  const { theme, setTheme } = useContext(UIContext);

  const onUpdateTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '10px 16px 8px 16px' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <Box sx={{ paddingX: 2 }}>
          <FormControlLabel
            control={
              <MaterialUISwitch
                checked={theme === 'dark'}
                onChange={() => onUpdateTheme()}
                sx={{ m: 1 }}
                defaultChecked
              />
            }
            label="Change theme"
          />
        </Box>
        <EntrySideBarList status="pending" />
        <EntrySideBarList status="in-progress" />
        <EntrySideBarList status="finished" />
      </Box>
    </Drawer>
  );
};
