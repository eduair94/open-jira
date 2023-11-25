/* eslint-disable no-unused-vars */
export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';

// eslint-disable-next-line no-shadow
export enum EntryEnum {
  ADD = '[Entry] - Add-Entry',
  IS_ADDING = '[Entry] - Is-Adding',
  ENTRY_UPDATED = '[Entry] - Entry-Updated',
}
