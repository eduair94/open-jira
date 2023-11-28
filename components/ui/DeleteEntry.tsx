'use client';
import { EntriesContext } from '@/context/entries';
import { deleteEntryAction } from '@/context/entries/entryActions';
import { Entry } from '@/interfaces';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, SxProps, Theme } from '@mui/material';
import { redirect } from 'next/navigation';
import { FC, MouseEvent, useContext, useMemo, useTransition } from 'react';

interface Props {
  entry: Entry;
  isCard?: boolean;
}

const styleProps = {
  color: 'white',
  '&:hover': {
    backgroundColor: 'error.dark',
  },
  backgroundColor: 'error.main',
};

export const DeleteEntry: FC<Props> = ({ entry, isCard }) => {
  const [pendingDelete, startTransactionDelete] = useTransition();
  const { deleteEntry } = useContext(EntriesContext);

  const onDeleteEntry = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    startTransactionDelete(async () => {
      await deleteEntryAction(entry);
      deleteEntry(entry);
      redirect('/');
    });
  };

  const conditionalStyle = useMemo(
    () =>
      isCard
        ? {
            position: 'absolute',
            top: 5,
            right: 5,
            width: 25,
            height: 25,
            fontSize: '12px',
            ' svg': {
              padding: '4px',
            },
            ...styleProps,
          }
        : {
            position: 'fixed',
            bottom: 30,
            right: 30,
            ...styleProps,
          },
    [isCard],
  ) as SxProps<Theme>;

  return (
    <IconButton
      size={isCard ? 'small' : 'medium'}
      onClick={onDeleteEntry}
      disabled={pendingDelete}
      sx={conditionalStyle}
    >
      <DeleteOutlineOutlinedIcon />
    </IconButton>
  );
};
