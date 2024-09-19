import Link from 'next/link';
import { CLIENT_PATH } from '@/app/lib/paths';

export function Card({ id, photo, name, price }: ClientProduct) {
  return (
    <Link href={CLIENT_PATH.PRODUCT + '/' + id}>
      <div className="grid grid-rows-3 items-center w-[18em] h-[25em] rounded-md border-[0.250rem] border-[#d5f6fb] text-center p-2">
        <div className="h-[95%] row-span-2">
          {photo ? (
            <img className="object-cover h-[100%] w-[100%]" src={photo} />
          ) : (
            <div className="h-[100%] w-[100%] grip items-center">
              <p className="text-slate-400">Imagen no disponible</p>
            </div>
          )}
        </div>
        <div className="grid row-span-1">
          <p className="my-2 text-secondary-fontLight">{name}</p>
          <p className="text-2xl">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

export interface ClientProduct {
  id: number;
  name: string;
  photo: string;
  price: number;
}
