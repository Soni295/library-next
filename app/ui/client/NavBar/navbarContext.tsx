'use client';

import { createContext, useContext } from 'react';
import { useToggle } from '@/app/lib/customHooks';
import { Props } from '@/app/lib/definitions';
import { useAuth } from '@/app/lib/usehook/useAuth';

const NavbarContext = createContext<INavbarContext>({
  session: null,
  burgerActive: false,
  toggle(_mockValue) {},
  canSome(permission: string[]) {},
});

export const useNavbarContext = () => useContext(NavbarContext);

export function NavbarProvider({ children }: Props) {
  const { user, canSome } = useAuth();
  const [burgerActive, toggle] = useToggle();

  return (
    <NavbarContext.Provider
      value={{ session: user, burgerActive, toggle, canSome }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

interface INavbarContext {
  session: ReturnType<typeof useAuth>['user'] | null;
  burgerActive?: boolean;
  toggle: (mockValue?: boolean) => void;
  canSome: (permission: string[]) => void;
}
