import type { Metadata } from 'next';

import { Props } from '@/app/lib/definitions';
import { INFO_STATIC } from '@/app/lib/static';
import { Navbar } from '@/app/ui/client/NavBar/index';
import { Footer } from '@/app/ui/client/Footer';

export const metadata: Metadata = {
  title: INFO_STATIC.name,
  description: INFO_STATIC.description,
  keywords: INFO_STATIC.keywords,
};

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
