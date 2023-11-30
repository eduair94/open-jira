import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import { EntryStatus } from '@/interfaces';
import { textShortener } from '@/utils';
import InboxOutlined from '@mui/icons-material/InboxOutlined';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useContext, useMemo } from 'react';

interface Props {
  status: EntryStatus;
}

const relation = {
  pending: 'Pending',
  'in-progress': 'In progress',
  finished: 'Finished',
};

export const EntrySideBarList: FC<Props> = ({ status }) => {
  const { closeSideMenu } = useContext(UIContext);
  const { entries } = useContext(EntriesContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries],
  );
  const pathname = usePathname();
  return (
    <List>
      <Typography
        sx={{ paddingX: 2, fontWeight: 'bold' }}
        className="capitalize"
      >
        {relation[status]}
      </Typography>
      {entriesByStatus.length ? (
        entriesByStatus.map((entry) => (
          <ListItem
            className={pathname == `/entries/${entry._id}` ? 'active-link' : ''}
            onClick={() => closeSideMenu()}
            component={Link}
            href={`/entries/${entry._id}`}
            key={entry._id}
            sx={{ color: 'inherit' }}
          >
            <ListItemIcon>
              <InboxOutlined />
            </ListItemIcon>
            <ListItemText primary={textShortener(entry.description)} />
          </ListItem>
        ))
      ) : (
        <Box sx={{ paddingX: 2 }}>
          <Typography sx={{ paddingBottom: 2, paddingTop: 1 }}>
            No tasks yet
          </Typography>
        </Box>
      )}
      <Divider />
    </List>
  );
};
