import { Props } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { SideBar } from '@/app/ui/dashboard/SideBar';
import { CLIENT_PATH } from '@/app/lib/paths';
import { userCtrl } from '@/app/lib/compose/inversify';

export default async function Layout({ children }: Props) {
  const isAdmin = await userCtrl.isAdmin();
  if (!isAdmin) redirect(CLIENT_PATH.HOME);

  return (
    <div className="flex flex-row bg-neutral-100 min-h-screen w-screen overflow-hidden">
      <SideBar />
      {children}
    </div>
  );
}
