'use client';

import { createContext, useContext } from 'react';
import { useToggle } from '@/app/lib/customHooks';

import { Props } from '@/app/lib/definitions';
import { MaybeSession } from '@/app/lib/definitions/session';

const NavbarContext = createContext<INavbarContext>({
  session: null,
  burgerActive: false,
  toggle(_mockValue) {},
});

export const useNavbarContext = () => useContext(NavbarContext);

export function NavbarProvider({ children, session }: NavbarProviderProps) {
  const [burgerActive, toggle] = useToggle();

  return (
    <NavbarContext.Provider value={{ session, burgerActive, toggle }}>
      {children}
    </NavbarContext.Provider>
  );
}

interface NavbarProviderProps extends Props {
  session: MaybeSession;
}

interface INavbarContext {
  session: MaybeSession;
  burgerActive?: boolean; // it's the droplist in the mobile version
  toggle: (mockValue?: boolean) => void;
}
