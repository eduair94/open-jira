'use server';
import { getEntriesDB, getEntryDB } from '@/database/dbEntries';
import { isValidObjectId } from 'mongoose';
import { RedirectType, redirect } from 'next/navigation';

export const entriesServer = async (): Promise<string> => {
  const entries = await getEntriesDB();
  return JSON.stringify(entries);
};

export const entryServerById = async (id: string): Promise<string> => {
  if (!isValidObjectId(id)) {
    return redirect('/', RedirectType.replace);
  }
  const entry = await getEntryDB(id);
  if (!entry) return redirect('/', RedirectType.replace);
  return JSON.stringify(entry);
};
