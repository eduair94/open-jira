'use client';
/* eslint-disable no-unused-vars */
import { Entry } from '@/interfaces';
import { MutableRefObject, createContext } from 'react';

interface ContextProps {
  entries: Entry[];
  addNewEntry: (entry: Entry) => void;
  updateEntryPage: (entry: Entry) => void;
  updateEntry: (entry: Entry) => void;
  updatedId: MutableRefObject<{ [key: string]: boolean }>;
  refreshEntries: (entries: Entry[]) => void;
  deleteEntry: (entry: Entry) => void;
  isLoadingEntries: boolean;
}

export const EntriesContext = createContext({} as ContextProps);
