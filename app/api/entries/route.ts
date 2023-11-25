import { db } from '@/database';
import { Entry, IEntry } from '@/models';

const getEntries = async () => {
  try {
    await db.connect();
    const entries: IEntry[] = await Entry.find().sort({ createdAt: -1 });
    await db.disconnect();

    return Response.json(entries, { status: 200 });
  } catch (e) {
    await db.disconnect();
    console.error(e);
    return Response.json({ success: false }, { status: 500 });
  }
};

const newEntry = async (req: Request) => {
  try {
    const body = await req.json();
    const { description = '' } = body;
    const newEntry = new Entry({
      description,
    });
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return Response.json({ success: true }, { status: 201 });
  } catch (e) {
    await db.disconnect();
    console.error(e);
    return Response.json({ success: false }, { status: 500 });
  }
};

export async function GET(): Promise<Response> {
  return getEntries();
}

export async function POST(req: Request): Promise<Response> {
  return newEntry(req);
}
