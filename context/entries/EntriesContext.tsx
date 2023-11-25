/* eslint-disable no-unused-vars */
import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  entries: Entry[]; // Falta el tipo de data del array
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);
