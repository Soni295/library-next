import { Props } from '@/app/lib/definitions';
import { CreateButton } from '../_components/createButton';
import { DashboardTitle } from '../_components/dashboardTitle';
import { DASHBOARD_PATH } from '@/app/lib/paths';

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Productos">
        <CreateButton
          className="ml-[2rem]"
          href={DASHBOARD_PATH.PRODUCTS_CREATE}
        />
      </DashboardTitle>
      {children}
    </div>
  );
}
