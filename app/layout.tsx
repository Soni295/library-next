import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Toaster } from 'sonner';
import SessionProvider from '@/app/lib/sessionProvider';
import { Props } from '@/app/lib/definitions';
import { INFO_STATIC } from '@/app/lib/static';
import { inter } from '@/app/ui/font';
import './ui/globals.css';

export const metadata: Metadata = {
  title: INFO_STATIC.name,
  description: INFO_STATIC.description,
  keywords: INFO_STATIC.keywords,
};

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <html lang={INFO_STATIC.lang}>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
