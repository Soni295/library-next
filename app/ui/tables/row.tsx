import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function Row({ children, className = '' }: PropsWithClassName) {
  const fullClassName = clsx(className);
  return <tr className={fullClassName}>{children}</tr>;
}
