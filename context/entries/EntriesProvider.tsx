'use client';
import { updateEntryAction } from '@/context/entries/entryActions';
import { Entry, EntryEnum } from '@/interfaces';
import { useSnackbar } from 'notistack';
import * as NProgress from 'nprogress';
import {
  FC,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { EntriesContext, entriesReducer } from '.';
import { entriesServer } from './entryServer';

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
  const [isLoadingEntries, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingUpdate, startTransitionUpdate] = useTransition();
  const updatedId = useRef({});

  const addNewEntry = (entry: Entry) => {
    dispatch({ type: EntryEnum.ADD, payload: entry });
  };

  const updateEntryPage = (entry: Entry) => {
    dispatch({ type: EntryEnum.ENTRY_UPDATED, payload: entry });
    enqueueSnackbar('Entry updated', {
      variant: 'success',
      persist: false,
      autoHideDuration: 1500,
    });
  };

  const updateEntry = (entry: Entry) => {
    updatedId.current = { [entry._id]: true };
    startTransitionUpdate(async () => {
      await updateEntryAction({
        _id: entry._id,
        status: entry.status,
        description: entry.description,
      });
      dispatch({ type: EntryEnum.ENTRY_UPDATED, payload: entry });
      updatedId.current = {};
      NProgress.done();
    });
  };

  const refreshEntries = (entries: Entry[]) => {
    dispatch({ type: EntryEnum.SET_ENTRIES, payload: entries });
  };

  const deleteEntry = (entry: Entry) => {
    dispatch({ type: EntryEnum.ENTRY_DELETED, payload: entry._id });
    enqueueSnackbar('Entry deleted', {
      variant: 'error',
      persist: false,
      autoHideDuration: 1500,
    });
  };

  const [, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      const entries = JSON.parse(await entriesServer());
      refreshEntries(entries);
      setIsLoading(false);
      NProgress.done();
    });
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        updateEntryPage,
        updatedId,
        refreshEntries,
        deleteEntry,
        isLoadingEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
