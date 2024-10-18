import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function Td({ children, className, title = '' }: TdProps) {
  const fullClassName = clsx('px-2 border-2 border-stone-400', className);
  return (
    <td title={title} className={fullClassName}>
      {children}
    </td>
  );
}

interface TdProps extends PropsWithClassName {
  title?: string;
}
