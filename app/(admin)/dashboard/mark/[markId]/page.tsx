import { markCtrl } from '@/app/lib/compose/inversify';
import { stringToNumber } from '@/app/lib/utils/convert';
import { MarkCreateForm } from '../_components/MakeForm';
import NotFoundMark from './not-found';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth/auth';
import { can } from '@/app/lib/can';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { redirect } from 'next/navigation';
import { PERMISSIONS } from '@/prisma/permissions';
export const dynamic = 'force-dynamic';

export default async function Page({ params }: MakePageProps) {
  const session = await getServerSession(authOptions);

  if (!can(session?.user, PERMISSIONS.mark.edit)) {
    redirect(DASHBOARD_PATH.MARK);
  }

  const id = stringToNumber(params.markId);
  const data = await markCtrl.getById({ id });

  if (!data) return <NotFoundMark id={params.markId} />;

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <MarkCreateForm
        id={id}
        link={data.icon ?? ''}
        name={data.name}
        enable={data.enable ? '1' : '0'}
      />
    </div>
  );
}

interface MakePageProps {
  params: { markId: string };
}
