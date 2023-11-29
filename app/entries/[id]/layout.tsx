import { entryServerById } from '@/context/entries/entryServer';
import { Entry } from '@/interfaces';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export default async function Layout({ children }: Props) {
  return <>{children}</>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const entry = JSON.parse((await entryServerById(id)) as string) as Entry;
  return {
    title: entry.description,
  };
}
