import { Suspense } from 'react';
import { Props } from '@/app/lib/definitions';
import { CreateButton } from '../_components/createButton';
import { DashboardTitle } from '../_components/dashboardTitle';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { SpinnerMain } from '@/app/ui/spinner';

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Productos">
        <CreateButton
          className="ml-[2rem]"
          href={DASHBOARD_PATH.PRODUCTS_CREATE}
        />
      </DashboardTitle>
      <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
        <Suspense fallback={<SpinnerMain />}>{children}</Suspense>
      </div>
    </div>
  );
}
