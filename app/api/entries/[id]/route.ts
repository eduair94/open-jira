import { NextRequest } from 'next/server';
import { getEntry, updateEntry } from '../controller';

interface Params {
  params: { id: string };
}

export async function PUT(
  req: NextRequest,
  { params }: Params,
): Promise<Response> {
  return updateEntry(req, params.id as string);
}

// GET entry

export async function GET(
  req: NextRequest,
  { params }: Params,
): Promise<Response> {
  return getEntry(req, params.id as string);
}
