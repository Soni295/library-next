'use client';

import clsx from 'clsx';
import {
  DashboardLink,
  LoginLink,
  NavbarCartLinkIcon,
  SignInLink,
} from './Links';
import { NavbarBtnBurger, NavbarBtnLogout } from './Buttons';
import { useNavbarContext } from './navbarContext';

export function NavBarHandler() {
  const { burgerActive } = useNavbarContext();
  const style = clsx(
    'fixed top-0 bg-brand-glass right-0 w-screen h-screen pt-14 sm:hidden',
    { hidden: !burgerActive },
  );

  return (
    <>
      <div className="hidden sm:flex">
        <NavbarCartLinkIcon />
        <DashboardLink />
        <NavbarBtnLogout />
        <LoginLink />
        <SignInLink />
      </div>

      <div className={style}>
        <div className="flex flex-col items-center">
          <LoginLink />
          <SignInLink />
          <NavbarCartLinkIcon />
          <DashboardLink />
          <NavbarBtnLogout />
        </div>
      </div>
      <NavbarBtnBurger />
    </>
  );
}
