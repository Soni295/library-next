'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { CLIENT_PATH, DASHBOARD_PATH } from '@/app/lib/paths';
import { NavbarLink } from '@/app/ui/dashboard/Navbar/NavbarLink';
import { INFO_STATIC } from '@/app/lib/static';
import {
  DashBoardIcon,
  LogOutIcon,
  MenuIcon,
  ProductsIcon,
  TagIcon,
  UserIcon,
} from './icons';

const dashBoardIcons = [
  { icon: DashBoardIcon, label: 'Dashboard', link: DASHBOARD_PATH.HOME },
  { icon: ProductsIcon, label: 'Marcas', link: DASHBOARD_PATH.MARK },
  { icon: ProductsIcon, label: 'Productos', link: DASHBOARD_PATH.PRODUCT },
  { icon: TagIcon, label: 'Etiquetas', link: DASHBOARD_PATH.TAGS },
  { icon: MenuIcon, label: 'Compras', link: DASHBOARD_PATH.PURCHASE },
];

const DASHBOARD_SIDEBAR_LINKS = [
  { icon: UserIcon, label: 'Usuarios', link: DASHBOARD_PATH.USERS },
  { icon: TagIcon, label: 'Configuraciones', link: DASHBOARD_PATH.CONFIG },
];

export function SideBar() {
  const pathname = usePathname() as string;
  const companyName = INFO_STATIC.name;

  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">
      <Link
        className="text-lg m-auto mx-2 font-semibold"
        href={CLIENT_PATH.HOME}
      >
        <span className="text-lg font-bold">{companyName}</span>
      </Link>
      <div className="flex-1">
        <ul className="space-y-2 font-medium mt-4">
          {dashBoardIcons.map((icon) => (
            <NavbarLink
              link={icon.link}
              key={icon.link}
              active={icon.link === pathname}
            >
              <icon.icon />
              <span className="ms-3">{icon.label}</span>
            </NavbarLink>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {DASHBOARD_SIDEBAR_LINKS.map((icon) => (
            <NavbarLink
              link={icon.link}
              key={icon.link}
              active={icon.link === pathname}
            >
              <icon.icon />
              <span className="ms-3">{icon.label}</span>
            </NavbarLink>
          ))}
          <div className="flex items-center p-2 rounded-lg text-red-600 hover:bg-gray-400 dark:hover:bg-gray-700 group">
            <LogOutIcon />
            <button className="ms-3" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
