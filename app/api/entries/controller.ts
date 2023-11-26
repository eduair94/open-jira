import { db } from '@/database';
import { EntryMin } from '@/interfaces';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export const getEntriesDB = async (): Promise<IEntry[]> => {
  await db.connect();
  const entries: IEntry[] = await Entry.find().sort({ createdAt: -1 });
  await db.disconnect();
  return entries;
};

export const getEntries = async () => {
  try {
    const entries = await getEntriesDB();
    return Response.json(entries, { status: 200 });
  } catch (e) {
    await db.disconnect();
    console.error(e);
    return Response.json({ success: false }, { status: 500 });
  }
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

export const newEntry = async (req: Request) => {
  try {
    const body = await req.json();
    const entry = await newEntryDB(body.description);
    return Response.json({ success: true, entry }, { status: 201 });
  } catch (e) {
    await db.disconnect();
    console.error(e);
    return Response.json({ success: false }, { status: 500 });
  }
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

export const updateEntry = async (req: NextRequest, id: string) => {
  try {
    const body = await req.json();
    const updatedEntry = await updateEntryDB(id, body);
    return Response.json(updatedEntry.body, { status: updatedEntry.status });
  } catch (error: unknown) {
    await db.disconnect();
    const e = error as { message: string };
    return Response.json({ message: e.message }, { status: 500 });
  }
};

export const getEntryDB = async (id: string) => {
  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();
  return entry;
};

export const getEntry = async (req: NextRequest, id: string) => {
  const entry = await getEntryDB(id);
  return Response.json(entry);
};
