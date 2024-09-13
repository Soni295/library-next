import Link from 'next/link';
import clsx from 'clsx';

import { Props } from '@/app/lib/definitions';

export function NavbarLink({
  to,
  children,
  isMobile = false,
  onClick,
}: NavbarLinkProps) {
  const style = clsx(
    'p-2 text-sm font-semibold rounded-2xl mx-2',
    'ease-in-out duration-700 hover:bg-brand-gray',
    'text-primary-fontlight',
    {
      hidden: !isMobile,
      'sm:block': !isMobile,
      'sm:hidden': isMobile,
      block: isMobile,
    },
  );
  return (
    <Link href={to} className={style} onClick={onClick}>
      {children}
    </Link>
  );
}

interface NavbarLinkProps extends Props {
  onClick?: () => void;
  to: string;
  isMobile: boolean;
}
