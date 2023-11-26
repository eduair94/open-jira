import { getEntries, newEntry } from './controller';

export async function GET(): Promise<Response> {
  return getEntries();
}

export async function POST(req: Request): Promise<Response> {
  return newEntry(req);
}
