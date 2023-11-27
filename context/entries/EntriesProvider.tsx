'use client';
import { updateEntryAction } from '@/components/ui/entryActions';
import { Entry, EntryEnum } from '@/interfaces';
import {
  FC,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useTransition,
} from 'react';
import { EntriesContext, entriesReducer } from '.';
import { entriesServer } from './entriesServer';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingUpdate, startTransitionUpdate] = useTransition();
  const [pendingEntries, startTransitionEntries] = useTransition();
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
    }
  };

  const refreshEntries = () => {
    console.log('refreshEntries');
    startTransitionEntries(async () => {
      const entries = JSON.parse(await entriesServer());
      dispatch({ type: EntryEnum.SET_ENTRIES, payload: entries });
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        updatedId,
        refreshEntries,
        pendingEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
