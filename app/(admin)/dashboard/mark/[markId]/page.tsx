import { markCtrl } from '@/app/lib/compose/inversify';
import { stringToNumber } from '@/app/lib/utils/convert';
import { MarkCreateForm } from '../_components/MakeForm';
import NotFoundMark from './not-found';
export const dynamic = 'force-dynamic';

export default async function Page({ params }: MakePageProps) {
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
