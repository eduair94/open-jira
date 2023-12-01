import { auth } from '@/auth';
import { EntryMin } from '@/interfaces';
import { Entry, IEntry } from '@/models';
import mongoose, { Types, isValidObjectId } from 'mongoose';
import { db } from '.';

/**
 * Fetches all entries from the database.
 * @returns {Promise<IEntry[]>} A promise that resolves to an array of entries.
 */
export const getEntriesDB = async (): Promise<IEntry[]> => {
  const session = await auth();
  if (!session || !session.user) throw new Error('No session found');
  const user = new mongoose.mongo.ObjectId(session.user.id);
  await db.connect();
  const entries: IEntry[] = await Entry.find({ user }).sort({
    createdAt: -1,
  });
  await db.disconnect();
  return entries;
};

/**
 * Creates a new entry in the database.
 * @param {string} description - The description of the new entry.
 * @returns {Promise<IEntry>} A promise that resolves to the created entry.
 */
export const newEntryDB = async (description: string) => {
  const session = await auth();
  if (!session || !session.user) throw new Error('No session found');
  const newEntry = new Entry({
    description,
  });
  newEntry.user = new Types.ObjectId(session.user.id);
  await db.connect();
  const res = await newEntry.save();
  await db.disconnect();
  return res;
};

/**
 * Updates an existing entry in the database.
 * @param {string} id - The ID of the entry to update.
 * @param {EntryMin} body - The new data for the entry.
 * @returns {Promise<{status: number, body: IEntry | {message: string}}>} A promise that resolves to the updated entry or an error message.
 */
export const updateEntryDB = async (id: string, body: EntryMin) => {
  if (!mongoose.isValidObjectId(id)) {
    return {
      status: 500,
      body: { message: 'Invalid ID' },
    };
  }
  const session = await auth();
  if (!session || !session.user) throw new Error('No session found');
  const user = new Types.ObjectId(session.user.id);
  await db.connect();
  const entryToUpdate = await Entry.findOne({ _id: id, user });
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

/**
 * Fetches a single entry from the database.
 * @param {string} id - The ID of the entry to fetch.
 * @returns {Promise<IEntry | null>} A promise that resolves to the fetched entry or null if not found.
 */
export const getEntryDB = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;
  const session = await auth();
  if (!session || !session.user) throw new Error('No session found');
  const user = new Types.ObjectId(session.user.id);
  await db.connect();
  const entry = await Entry.findOne({ _id: id, user }).lean();
  await db.disconnect();
  return entry;
};

/**
 * Deletes an entry from the database.
 * @param {string} id - The ID of the entry to delete.
 */
export const deleteEntryDB = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) throw new Error('No session found');
  const user = new Types.ObjectId(session.user.id);
  await Entry.findOneAndDelete({ _id: id, user });
};
