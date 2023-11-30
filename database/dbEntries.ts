import { auth } from '@/auth';
import { EntryMin } from '@/interfaces';
import { Entry, IEntry } from '@/models';
import mongoose, { isValidObjectId } from 'mongoose';
import { db } from '.';

export const getEntriesDB = async (): Promise<IEntry[]> => {
  const user = await auth();
  console.log(user);
  await db.connect();
  const entries: IEntry[] = await Entry.find().sort({
    createdAt: -1,
  });
  await db.disconnect();
  return user;
};

export const newEntryDB = async (description: string) => {
  const newEntry = new Entry({
    description,
  });
  await db.connect();
  const res = await newEntry.save();
  await db.disconnect();
  return res;
};

export const updateEntryDB = async (id: string, body: EntryMin) => {
  if (!mongoose.isValidObjectId(id)) {
    return {
      status: 500,
      body: { message: 'Invalid ID' },
    };
  }
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return {
      status: 400,
      body: { message: 'No entry found for the ID ' + id },
    };
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true },
    );
    await db.disconnect();
    return {
      status: 200,
      body: updatedEntry,
    };
  } catch (error) {
    await db.disconnect();
    const e = error as { errors: { status: { message: string } } };
    return {
      status: 400,
      body: { message: e.errors.status.message },
    };
  }
};

export const getEntryDB = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();
  return entry;
};

export const deleteEntryDB = async (id: string) => {
  await Entry.findByIdAndDelete(id);
};
