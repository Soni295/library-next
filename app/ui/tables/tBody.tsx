import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function TBody({ children, className = '' }: PropsWithClassName) {
  const fullClassName = clsx(className);
  return <tbody className={fullClassName}>{children}</tbody>;
}
