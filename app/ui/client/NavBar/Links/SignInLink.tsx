import { CLIENT_PATH } from '@/app/lib/paths';
import { NavbarLink } from './NavbarLink';
import { useNavbarContext } from '../navbarContext';

export function SignInLink() {
  const { toggle, session } = useNavbarContext();
  if (session) return <></>;

  return (
    <NavbarLink onClick={() => toggle(false)} to={CLIENT_PATH.SIGN_IN}>
      Registrarse
    </NavbarLink>
  );
}
