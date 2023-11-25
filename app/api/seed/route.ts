import { db, seedData } from '@/database';
import { Entry } from '@/models';

interface Data {
  message: string;
}

export async function GET(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    const resp: Data = { message: "You don't have access to the seed" };
    return Response.json(resp, { status: 401 });
  }
  await db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();
  return Response.json({ message: 'Process done correctly' }, { status: 200 });
}
