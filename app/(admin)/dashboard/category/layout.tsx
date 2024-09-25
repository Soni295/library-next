import { Suspense } from 'react';
import { Props } from '@/app/lib/definitions';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { CreateButton } from '../_components/createButton';
import { DashboardTitle } from '../_components/dashboardTitle';
import { SpinnerMain } from '@/app/ui/spinner';

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Categorias">
        <CreateButton
          className="ml-[2rem]"
          href={DASHBOARD_PATH.CATEGORY_CREATE}
        />
      </DashboardTitle>
      <Suspense fallback={<SpinnerMain />}>{children}</Suspense>
    </div>
  );
}
