'use client';
import { NewEntry } from '@/components/ui';
import { EntryList } from '@/components/ui/EntryList';
import { Card, CardHeader, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const cardStyle = {
    height: {
      default: 'auto',
      md: 'calc(100vh - 100px)',
    },
    overflow: 'auto',
    backgroundColor: isDarkMode ? undefined : '#eeeeee',
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader
            sx={{
              position: 'sticky',
              backgroundColor: isDarkMode ? '#121212' : 'inherit',
              top: 0,
              zIndex: 2,
              backgroundImage: 'inherit',
              boxShadow: '0 1px 10px 1px black',
            }}
            title="Pending"
          />
          <NewEntry />
          <EntryList status="pending" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader
            sx={{ boxShadow: '0 1px 10px 1px black' }}
            title="In Progress"
          />
          <EntryList status="in-progress" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader
            sx={{ boxShadow: '0 1px 10px 1px black' }}
            title="Finished"
          />
          <EntryList status="finished" />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
