import { Props } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { SideBar } from '@/app/ui/dashboard/SideBar';
import { CLIENT_PATH } from '@/app/lib/paths';
import { userCtrl } from '@/app/lib/compose/inversify';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth/auth';

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect(CLIENT_PATH.HOME);

  const roles = await userCtrl.getRolesByUserId(session.user.id);

  if (!roles.some((r) => r.name == 'admin' || r.name == 'employee')) {
    redirect(CLIENT_PATH.HOME);
  }

  return (
    <div className="flex flex-row bg-neutral-100 min-h-screen w-screen overflow-hidden">
      <SideBar />
      {children}
    </div>
  );
}
