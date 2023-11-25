interface Data {
  message: string;
}

export async function GET(): Promise<Response> {
  const resp: Data = { message: 'Hello from Me!' };
  return Response.json(resp, { status: 200 });
}
