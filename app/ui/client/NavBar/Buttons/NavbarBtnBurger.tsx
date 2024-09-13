import clsx from 'clsx';
import { useNavbarContext } from '../navbarContext';

export function NavbarBtnBurger() {
  const { toggle, burgerActive } = useNavbarContext();
  const basic = clsx('block w-7 h-1 bg-black');
  const rLeft = clsx(basic, 'translate-y-[0.225rem] rotate-45');
  const rRight = clsx(basic, '-translate-y-[0.225rem] -rotate-45');

  return (
    <>
      <button className="space-y-1 group sm:hidden" onClick={() => toggle()}>
        {burgerActive ? (
          <>
            <span className={rLeft}></span>
            <span className={rRight}></span>
          </>
        ) : (
          <>
            <span className={basic}></span>
            <span className={basic}></span>
            <span className={basic}></span>
          </>
        )}
      </button>
    </>
  );
}
