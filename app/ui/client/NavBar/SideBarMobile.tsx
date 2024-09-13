'use client';

import clsx from 'clsx';
import { useNavbarContext } from './navbarContext';
import {
  DashboardLink,
  LoginLink,
  NavbarCartLinkIcon,
  SignInLink,
} from './Links';
import { NavbarBtnLogout } from './Buttons';

export function NavbarDropdownMobile() {
  const { burgerActive } = useNavbarContext();

  const style = clsx(
    'fixed top-0 bg-brand-glass right-0 w-screen h-screen pt-14 sm:hidden',
    { hidden: !burgerActive },
  );

  return (
    <div className={style}>
      <div className="flex flex-col items-center">
        <LoginLink />
        <SignInLink />
        <NavbarCartLinkIcon />
        <DashboardLink />
        <NavbarBtnLogout />
      </div>
    </div>
  );
}
