import Link from 'next/link';
import { CLIENT_PATH } from '@/app/lib/paths';
import { INFO_STATIC } from '@/app/lib/static';

export function NavBarIcon() {
  const [tipo, name] = INFO_STATIC.name.split(' ');

  const mainStyle = 'sm:text-sm md:text-lg m-auto mx-2 font-semibold';
  const spanStyle = 'hidden sm:inline';
  const span2Style = 'inline sm:hidden';

  return (
    <Link className={mainStyle} href={CLIENT_PATH.HOME}>
      <span className={spanStyle}>{tipo}</span>
      <span className={span2Style}>{tipo[0]}. </span> {name}
    </Link>
  );
}
