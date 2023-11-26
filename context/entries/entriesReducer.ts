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
    }
  | {
      type: EntryEnum.SET_ENTRIES;
      payload: Entry[];
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType,
): EntriesState => {
  switch (action.type) {
    case EntryEnum.ADD:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
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
    case EntryEnum.SET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
};
