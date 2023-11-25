import { entriesApi } from '@/apis';
import { Entry, EntryEnum } from '@/interfaces';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from '.';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({ type: EntryEnum.ADD, payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: EntryEnum.ENTRY_UPDATED, payload: entry });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: EntryEnum.SET_ENTRIES, payload: data });
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
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
