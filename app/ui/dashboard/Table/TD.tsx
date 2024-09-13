import { Props } from '@/app/lib/definitions';

export function TD({ children, label }: TDProds) {
  return (
    <td className="p-[0.5rem] font-semibold  sm:p-[1rem] grid grid-cols-[9ch,auto] sm:table-cell text-left">
      <span className="font-normal sm:hidden">{label}:</span>
      {children}
    </td>
  );
}

interface TDProds extends Props {
  label: string;
}
