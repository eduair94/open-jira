'use client';
/* eslint-disable no-unused-vars */
import { Entry } from '@/interfaces';
import { MutableRefObject, createContext } from 'react';

interface ContextProps {
  entries: Entry[]; // Falta el tipo de data del array
  addNewEntry: (entry: Entry) => void;
  updateEntry: (entry: Entry, clientOnly?: boolean) => void;
  updatedId: MutableRefObject<{ [key: string]: boolean }>;
  refreshEntries: () => void;
  pendingEntries: boolean;
}

export const EntriesContext = createContext({} as ContextProps);
