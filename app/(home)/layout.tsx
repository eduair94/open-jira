import { entriesServer } from '@/context/entries/entryServer';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: {
    entries: string;
  };
}

export default async function Layout({ children, params }: Props) {
  params.entries = await entriesServer();
  return <>{children}</>;
}
