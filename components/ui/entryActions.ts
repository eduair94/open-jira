'use server';

import { newEntryDB, updateEntryDB } from '@/app/api/entries/controller';
import { EntryMin, EntryStatus } from '@/interfaces';

export async function addEntryAction(prevState: unknown, formData: FormData) {
  const description = formData.get('description') as string;
  if (!description) return;
  const res = await newEntryDB(description);
  return JSON.stringify(res);
}

export async function updateEntryAction(entry: EntryMin) {
  await updateEntryDB(entry._id, entry);
  return;
}

export async function updateEntryActionPage(
  prevState: { _id: string },
  formData: FormData,
) {
  const _id = prevState._id;
  const entry = {
    _id,
    description: formData.get('description') as string,
    status: formData.get('status') as EntryStatus,
  };
  const res = await updateEntryDB(_id, entry);
  return JSON.stringify(res.body);
}
