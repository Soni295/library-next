import { Props } from '@/app/lib/definitions';
import Link from 'next/link';

interface NavbarLinkProps extends Props {
  link: string;
  active?: boolean;
}

export function NavbarLink({ children, link, active }: NavbarLinkProps) {
  const isActive = active ? 'text-zinc-50' : 'text-zinc-600';
  return (
    <li>
      <Link
        href={link}
        className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-400 ${isActive} dark:hover:bg-gray-700 group`}
      >
        {children}
      </Link>
    </li>
  );
}
