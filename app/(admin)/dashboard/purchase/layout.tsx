import { Props } from '@/app/lib/definitions';
import { DashboardTitle } from '../_components/dashboardTitle';
import { CreateButton } from '../_components/createButton';
import { DASHBOARD_PATH } from '@/app/lib/paths';

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Ordenes de compra">
        <CreateButton
          className="ml-[2rem]"
          href={DASHBOARD_PATH.PURCHASE_CREATE}
        />
      </DashboardTitle>
      {children}
    </div>
  );
}
