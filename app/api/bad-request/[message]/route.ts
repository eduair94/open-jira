import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { message: string } },
) {
  const message = params.message || 'Bad Request';
  return Response.json({ ok: false, message }, { status: 400 });
}
