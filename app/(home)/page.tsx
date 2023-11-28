'use client';
import { NewEntry } from '@/components/ui';
import { EntryList } from '@/components/ui/EntryList';
import { EntriesContext } from '@/context/entries';
import { Card, CardHeader, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NextPage } from 'next';
import { useContext, useEffect } from 'react';

interface Props {
  params: {
    entries: string;
  };
}

const Home: NextPage<Props> = ({ params }) => {
  const { refreshEntries } = useContext(EntriesContext);

  useEffect(() => {
    refreshEntries(JSON.parse(params.entries));
  }, [params.entries]);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const cardStyle = {
    maxHeight: {
      default: 'auto',
      md: 'calc(100vh - 100px)',
    },
    minHeight: {
      default: 'auto',
      md: 'calc(100vh - 100px)',
    },
    overflow: 'auto',
    backgroundColor: isDarkMode ? undefined : '#eeeeee',
  };
  const styleCardHeader = {
    position: 'sticky',
    backgroundColor: isDarkMode ? '#121212' : 'inherit',
    top: 0,
    zIndex: 2,
    backgroundImage: 'inherit',
    boxShadow: '0 1px 10px 1px rgba(0, 0, 0, 0.2)',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader sx={styleCardHeader} title="Pending" />
          <NewEntry />
          <EntryList status="pending" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader sx={styleCardHeader} title="In Progress" />
          <EntryList status="in-progress" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardHeader sx={styleCardHeader} title="Finished" />
          <EntryList status="finished" />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
