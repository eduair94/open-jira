'use client';

import { UIContext } from '@/context/ui/UIContext';
import { Entry, EntryStatus } from '@/interfaces';
import { List, Paper } from '@mui/material';
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryCard } from '.';
import { EntriesContext } from '../../context/entries';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry, updatedId } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries],
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((e) => e._id === id) as Entry;
    updateEntry({ ...entry, status });
    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      style={{ height: 'calc(100% - 64px)' }}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          backgroundColor: 'transparent',
          padding: '0px 8px',
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: '0.3s' }}>
          {entriesByStatus.map((entry) => (
            // eslint-disable-next-line no-underscore-dangle
            <EntryCard
              key={entry._id}
              entry={entry}
              loading={updatedId.current[entry._id]}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
};
