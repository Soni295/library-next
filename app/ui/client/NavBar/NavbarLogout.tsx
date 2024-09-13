import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useNavbarContext } from './navbarContext';

export function NavbarLogout() {
  const { session } = useNavbarContext();
  if (!session) return <></>;

  const style = clsx(
    'p-2 text-sm font-semibold rounded-2xl mx-2',
    'ease-in-out duration-700 hover:bg-gray-300',
    'text-primary-fontlight',
  );

  return (
    <button onClick={() => signOut()} className={style}>
      Desconectar
    </button>
  );
}
