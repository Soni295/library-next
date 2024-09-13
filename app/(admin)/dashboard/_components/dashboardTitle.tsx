import { Props } from '@/app/lib/definitions';

interface DashboardTitle extends Props {
  title: string;
}

export function DashboardTitle({ title, children }: DashboardTitle) {
  return (
    <div className="flex ml-8 my-6 flex-row font-semibold align-center">
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  );
}
