import { entryServerById } from '@/context/entries/entriesServer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Open Jira App',
  description: 'Open Jira App',
};

interface Props {
  children: React.ReactNode;
  params: { id: string; entry: string };
}

export default async function Layout({ children, params }: Props) {
  const { id } = params;
  params.entry = (await entryServerById(id)) as string;
  return <>{children}</>;
}
