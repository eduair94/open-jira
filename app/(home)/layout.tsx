import { Layout } from '@/components/layouts';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
