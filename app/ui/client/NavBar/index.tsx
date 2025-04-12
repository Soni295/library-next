import { NavbarSearch } from './NavbarSearch';
import { NavBarIcon } from './NavbarIcon';
import { NavBarHandler } from './NavBarHandler';
import { NavbarProvider } from './navbarContext';
import { getSession } from '@/app/lib/session';
import clsx from 'clsx';

export async function Navbar() {
  const session = await getSession();

  const className = clsx(
    'flex',
    'h-[2.5rem] w-screen px-[1rem]',
    'items-center justify-between',
    'bg-brand-light',
  );

  return (
    <nav className={className}>
      <NavBarIcon />
      <NavbarSearch />
      <div className="flex">
        <NavbarProvider session={session}>
          <NavBarHandler />
        </NavbarProvider>
      </div>
    </nav>
  );
}
