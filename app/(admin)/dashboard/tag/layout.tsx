import { Props } from '@/app/lib/definitions';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { CreateButton } from '../_components/createButton';
import { DashboardTitle } from '../_components/dashboardTitle';

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardTitle title="Etiquetas">
        <CreateButton className="ml-[2rem]" href={DASHBOARD_PATH.TAGS_CREATE} />
      </DashboardTitle>
      {children}
    </div>
  );
}
