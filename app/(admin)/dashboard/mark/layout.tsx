import { Props } from '@/app/lib/definitions';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { CreateButton } from '../_components/createButton';
import { DashboardTitle } from '../_components/dashboardTitle';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth/auth';
import { can } from '@/app/lib/can';
import { PERMISSIONS } from '@/prisma/permissions';

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return <></>;

  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Marcas">
        {can(session.user, PERMISSIONS.mark.create) && (
          <CreateButton
            className="ml-[2rem]"
            href={DASHBOARD_PATH.MARK_CREATE}
          />
        )}
      </DashboardTitle>
      {children}
    </div>
  );
}
