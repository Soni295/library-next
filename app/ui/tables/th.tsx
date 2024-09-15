import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function Th({ children, className }: PropsWithClassName) {
  const fullClassName = clsx(
    'px-[1.5rem]',
    'py-[0.8rem]',
    'text-left',
    'text-xs',
    'border',
    'font-semibold',
    'text-gray-800',
    'uppercase',
    'tracking-wider',
    className,
  );
  return <th className={fullClassName}>{children}</th>;
}