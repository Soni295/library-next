import Link from 'next/link';
import { CLIENT_PATH } from '@/app/lib/paths';
import { INFO_STATIC } from '@/app/lib/static';

export function NavBarIcon() {
  const [tipo, name] = INFO_STATIC.name.split(' ');
  return (
    <Link className="text-lg m-auto mx-2 font-semibold" href={CLIENT_PATH.HOME}>
      <span className="hidden sm:inline">{tipo}</span> {name}
    </Link>
  );
}
