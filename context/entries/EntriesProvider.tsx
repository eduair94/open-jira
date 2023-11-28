'use client';
import { updateEntryAction } from '@/context/entries/entryActions';
import { Entry, EntryEnum } from '@/interfaces';
import { useSnackbar } from 'notistack';
import { FC, ReactNode, useReducer, useRef, useTransition } from 'react';
import { EntriesContext, entriesReducer } from '.';

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: ReactNode;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingUpdate, startTransitionUpdate] = useTransition();
  const updatedId = useRef({});

  const addNewEntry = (entry: Entry) => {
    dispatch({ type: EntryEnum.ADD, payload: entry });
  };

  const updateEntry = (entry: Entry, clientOnly = false) => {
    if (!clientOnly) {
      updatedId.current = { [entry._id]: true };
      startTransitionUpdate(async () => {
        await updateEntryAction({
          _id: entry._id,
          status: entry.status,
          description: entry.description,
        });
        dispatch({ type: EntryEnum.ENTRY_UPDATED, payload: entry });
        updatedId.current = {};
      });
    } else {
      dispatch({ type: EntryEnum.ENTRY_UPDATED, payload: entry });
      enqueueSnackbar('Entry updated', { variant: 'success' });
    }
  };

  const refreshEntries = (entries: Entry[]) => {
    dispatch({ type: EntryEnum.SET_ENTRIES, payload: entries });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        updatedId,
        refreshEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
