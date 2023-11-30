import { Layout } from '@/components/layouts';
import { entryServerById } from '@/context/entries/entryServer';
import { Entry } from '@/interfaces';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: { id: string };
}

export default async function EntriesLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const entry = JSON.parse((await entryServerById(id)) as string) as Entry;
  return {
    title: entry.description,
  };
}
