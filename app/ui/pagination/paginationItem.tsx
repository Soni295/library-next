import Link from 'next/link';
import { clsx } from 'clsx';

interface PaginationItemProps {
  page: number;
  disabled?: boolean;
  href: string;
}

export function PaginationItem({
  page,
  href,
  disabled = false,
}: PaginationItemProps) {
  const className = clsx(
    'relative h-10 max-h-[40px] w-10 max-w-[40px]',
    'select-none rounded-lg text-center',
    'align-middle font-sans text-xs font-medium disabled:pointer-events-none',
    'transition-all disabled:shadow-none',
    {
      //'bg-gray-900': disabled,
      'bg-gray-200': disabled,
      'text-gray-400': disabled,
      'cursor-default': disabled,
      'active:bg-gray-900/20': !disabled,
      'hover:bg-gray-900': !disabled,
      'text-white': !disabled,
      'bg-gray-900/80': !disabled,
    },
  );

  return (
    <Link className={className} href={href}>
      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {page}
      </span>
    </Link>
  );
}
