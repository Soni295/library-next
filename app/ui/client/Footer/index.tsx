'use client';

import Image from 'next/image';
import Link from 'next/link';
import { INFO_STATIC } from '@/app/lib/static';

export const Footer = () => (
  <footer className="relative bg-secondary-light pt-8 pb-6 grid justify-center">
    <div className="grid grid-cols-2 items-center pb-2">
      <p className="pl-3 text-inactive-light text-lg font-bold">
        Nuestras Redes
      </p>
      <InstagramIcon />
    </div>
    <span className="text-sm text-inactive-light text-center">
      {INFO_STATIC.name} {new Date().getFullYear()}© Copyright - Todos los
      derechos reservados
    </span>
    <span className="text-sm text-inactive-light text-center">
      {INFO_STATIC.address}
    </span>
  </footer>
);

function InstagramIcon() {
  return (
    <Link href={INFO_STATIC.links.instagram} passHref legacyBehavior>
      <a target="_blank">
        <Image src="/insta.png" alt="instagram" width={32} height={32} />
      </a>
    </Link>
  );
}
