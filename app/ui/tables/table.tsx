import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

interface TableProps extends PropsWithClassName {}

export function Table({ className = '', children }: TableProps) {
  const fullClassName = clsx(
    'table-auto',
    'inline-block',
    'shadow-md',
    'm-auto',
    'border-collapse',
    className,
  );

  return <table className={fullClassName}>{children}</table>;
}
