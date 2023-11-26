'use client';
import { updateEntryAction } from '@/components/ui/entryActions';
import { Entry, EntryEnum } from '@/interfaces';
import {
  FC,
  ReactNode,
  useMemo,
  useReducer,
  useRef,
  useTransition,
} from 'react';
import { EntriesContext, entriesReducer } from '.';

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: ReactNode;
  entries: string;
}

// const ENTRIES_INITIAL_STATE: EntriesState = {
//   entries: [],
// };

export const EntriesProvider: FC<Props> = ({ children, entries }) => {
  const ENTRIES_INITIAL_STATE: EntriesState = useMemo(
    () => ({
      entries: JSON.parse(entries),
    }),
    [entries],
  );
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingUpdate, startTransitionUpdate] = useTransition();
  const updatedId = useRef({});

  const addNewEntry = (entry: Entry) => {
    dispatch({ type: EntryEnum.ADD, payload: entry });
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
    });
  };

  // const refreshEntries = async () => {
  //   const { data } = await entriesApi.get<Entry[]>('/entries');
  //   dispatch({ type: EntryEnum.SET_ENTRIES, payload: data });
  // };

  // useEffect(() => {
  //   refreshEntries();
  // }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        updatedId,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
