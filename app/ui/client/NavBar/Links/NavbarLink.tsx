import Link from 'next/link';
import clsx from 'clsx';
import { Props } from '@/app/lib/definitions';

export function NavbarLink({ to, children, onClick }: NavbarLinkProps) {
  const style = clsx(
    'p-2 text-sm font-semibold rounded-2xl mx-2',
    'ease-in-out duration-700 hover:bg-brand-gray',
    'text-primary-fontlight',
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
}
