import { auth } from '@/auth';
import { db } from '@/database';
import { getEntryDB, newEntryDB, updateEntryDB } from '@/database/dbEntries';
import { NextRequest } from 'next/server';

export const getEntries = async () => {
  const user = await auth();
  return Response.json(user);
  // try {
  //   const entries = await getEntriesDB();
  //   return Response.json(entries, { status: 200 });
  // } catch (e) {
  //   await db.disconnect();
  //   console.error(e);
  //   return Response.json({ success: false }, { status: 500 });
  // }
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

export const getEntry = async (req: NextRequest, id: string) => {
  const entry = await getEntryDB(id);
  return Response.json(entry);
};
