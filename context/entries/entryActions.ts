'use server';

import { deleteEntryDB, newEntryDB, updateEntryDB } from '@/database/dbEntries';
import { Entry, EntryMin, EntryStatus } from '@/interfaces';
import { revalidatePath } from 'next/cache';

export async function addEntryAction(_prevState: unknown, formData: FormData) {
  const description = formData.get('description') as string;
  if (!description) return;
  const res = await newEntryDB(description);
  return JSON.stringify(res);
}

export async function updateEntryAction(entry: EntryMin) {
  await updateEntryDB(entry._id, entry);
}

export async function updateEntryActionPage(
  _prevState: unknown,
  formData: FormData,
) {
  const entry = {
    _id: formData.get('_id') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as EntryStatus,
  };
  const res = await updateEntryDB(entry._id, entry);
  revalidatePath(`/entries/${entry._id}`);
  revalidatePath('/');
  return JSON.stringify(res.body);
}

export async function deleteEntryAction(entry: Entry) {
  await deleteEntryDB(entry._id);
}
