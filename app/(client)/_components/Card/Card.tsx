import Link from 'next/link';
import { CLIENT_PATH } from '@/app/lib/paths';
import { ClientProductProps } from './interfaces';
import { CardImage } from './CardImage';

export function Card({ id, photo, name, price }: ClientProductProps) {
  return (
    <Link
      className="grid grid-rows-3 w-full items-center hover:border-[0.15rem] h-[25em] rounded-md border-[0.1rem] border-[#d5f6fb] text-center p-2"
      href={CLIENT_PATH.PRODUCT + '/' + id}
    >
      <CardImage photo={photo} name={name} />
      <div className="grid">
        <p className="my-2 text-secondary-fontLight truncate text-ellipsis">
          {name}
        </p>
        <p className="text-2xl">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
