import clsx from 'clsx';
import { LoginLink, NavbarCartLinkIcon, SignInLink } from './Links';
import { NavbarBtnBurger, NavbarBtnLogout } from './Buttons';
import { useNavbarContext } from './navbarContext';
import { NavbarLink } from './NavbarLink';
import { DASHBOARD_PATH } from '@/app/lib/paths';

export function NavBarHandler() {
  const { session, burgerActive, canSome } = useNavbarContext();
  const style = clsx(
    'fixed top-0 bg-brand-glass right-0 w-screen h-screen pt-14 sm:hidden',
    { hidden: !burgerActive },
  );

  const permisos = ['create_product', 'edit_product'];
  const isEditedUser = canSome(permisos);

  return (
    <>
      <div className="hidden sm:flex">
        <NavbarCartLinkIcon />
        {isEditedUser && (
          <NavbarLink to={DASHBOARD_PATH.HOME}>Dashboard</NavbarLink>
        )}
        <NavbarBtnLogout />
        <LoginLink />
        <SignInLink />
      </div>

      <div className={style}>
        <div className="flex flex-col items-center">
          <LoginLink />
          <SignInLink />
          <NavbarCartLinkIcon />
          {isEditedUser && (
            <NavbarLink to={DASHBOARD_PATH.HOME}>Dashboard</NavbarLink>
          )}
          <NavbarBtnLogout />
        </div>
      </div>
      <NavbarBtnBurger />
    </>
  );
}
