import { CLIENT_PATH } from '@/app/lib/paths';
import { useNavbarContext } from '../navbarContext';
import { NavbarLink } from './NavbarLink';
import Image from 'next/image';

export function NavbarCartLinkIcon() {
  const { session, toggle } = useNavbarContext();
  if (!session) return <></>;

  return (
    <NavbarLink onClick={() => toggle(false)} to={CLIENT_PATH.CART}>
      <p className="sm:hidden">Carrito</p>
      <Image
        className="hidden sm:block"
        alt="carrito"
        width={28}
        height={28}
        src="/cart.png"
      />
    </NavbarLink>
  );
}
