import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function Td({ children, className }: PropsWithClassName) {
  const fullClassName = clsx('px-2 border-2 border-stone-400', className);

  return <td className={fullClassName}>{children}</td>;
}
