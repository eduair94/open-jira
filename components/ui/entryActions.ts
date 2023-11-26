'use server';

import { newEntryDB, updateEntryDB } from '@/app/api/entries/controller';
import { EntryMin } from '@/interfaces';

export async function addEntryAction(prevState: unknown, formData: FormData) {
  const description = formData.get('description') as string;
  if (!description) return;
  const res = await newEntryDB(description);
  return res;
}

export async function updateEntryAction(entry: EntryMin) {
  await updateEntryDB(entry._id, entry);
  return;
}
