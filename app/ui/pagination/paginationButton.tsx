import { clsx } from 'clsx';
import Link from 'next/link';
import { PropsWithClassName } from '@/app/lib/definitions';

interface PaginationButtoProps extends PropsWithClassName {
  disabled?: boolean;
  href: string;
}

export function PaginationButton({
  disabled = false,
  children,
  href,
}: PaginationButtoProps) {
  const cls = clsx(
    'flex items-center gap-2 px-6 py-3 font-sans text-xs',
    'text-center align-middle transition-all font-bold',
    'rounded-lg select-none   ',
    //'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    {
      'active:bg-gray-900/20': !disabled,
      'hover:bg-gray-900': !disabled,
      'text-white': !disabled,
      'bg-gray-900/80': !disabled,

      'cursor-default': disabled,
      'text-gray-400': disabled,
      'bg-gray-200': disabled,
    },
  );

  if (disabled) return <div className={cls}>{children}</div>;

  return (
    <Link href={href} className={cls} type="button">
      {children}
    </Link>
  );
}
