import { Entry, EntryEnum } from '@/interfaces';
import { EntriesState } from '.';

type EntriesActionType =
  | {
      type: EntryEnum.ADD;
      payload: Entry;
    }
  | {
      type: EntryEnum.ENTRY_UPDATED;
      payload: Entry;
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType,
): EntriesState => {
  switch (action.type) {
    case EntryEnum.ADD:
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case EntryEnum.ENTRY_UPDATED:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};
