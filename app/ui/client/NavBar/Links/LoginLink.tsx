import { CLIENT_PATH } from '@/app/lib/paths';
import { useNavbarContext } from '../navbarContext';
import { NavbarLink } from './NavbarLink';
import { PropsWithIsMobile } from '@/app/lib/definitions';

export function LoginLink({ isMobile = false }: PropsWithIsMobile) {
  const { toggle, session } = useNavbarContext();
  if (session) return <></>;

  return (
    <NavbarLink onClick={() => toggle(false)} to={CLIENT_PATH.LOGIN}>
      Ingresar
    </NavbarLink>
  );
}
