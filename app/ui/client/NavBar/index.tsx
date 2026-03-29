'use client';
import clsx from 'clsx';
import { NavbarSearch } from './NavbarSearch';
import { NavBarIcon } from './NavbarIcon';
import { NavBarHandler } from './NavBarHandler';
import { NavbarProvider } from './navbarContext';

export function Navbar() {
  return (
    <nav
      className={clsx(
        'flex',
        'h-[2.5rem]',
        'w-screen',
        'md:px-[1rem]',
        'bg-brand-light',
        'items-center',
        'justify-between',
      )}
    >
      <NavBarIcon />
      <NavbarSearch />
      <div className="flex">
        <NavbarProvider>
          <NavBarHandler />
        </NavbarProvider>
      </div>
    </nav>
  );
}
