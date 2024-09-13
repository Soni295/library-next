import { NavbarSearch } from './NavbarSearch';
import { NavBarIcon } from './NavbarIcon';
import { NavBarHandler } from './NavBarHandler';
import { NavbarProvider } from './navbarContext';
import { getSession } from '@/app/lib/session';

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="flex h-[2.5rem] w-screen px-[1rem] bg-brand-light items-center justify-between">
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
