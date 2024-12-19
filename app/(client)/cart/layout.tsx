'use client';
import { Props } from '@/app/lib/definitions';
import { CLIENT_PATH } from '@/app/lib/paths';
import clsx from 'clsx';
import { link } from 'fs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: Props) {
  const pathName = usePathname();
  if (pathName.includes(CLIENT_PATH.CART_HISTORY)) {
    console.log('history');
  }
  console.log(pathName);

  const links = [
    { label: 'Carrito de Compras', href: CLIENT_PATH.CART },
    { label: 'Historico', href: CLIENT_PATH.CART_HISTORY },
  ];
  const title = links.find((l) => l.href === pathName);
  return (
    <div className="container align-bottom mx-auto mt-5">
      <div className="flex gap-3 my-6 flex-row font-semibold">
        <h2 className="text-2xl align-bottom">Compras</h2>
        {links.map((l) => (
          <div key={l.label} className="flex align-center">
            <span className="mr-[1rem]">/</span>
            <Link
              className={clsx('align-middle underline underline-offset-2', {
                'text-blue-700': l.href !== pathName,
                'text-slate-900': l.href === pathName,
                'cursor-default': l.href === pathName,
              })}
              href={l.href}
            >
              {l.label}
            </Link>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6">{title?.label}</h1>
      {children}
    </div>
  );
}
