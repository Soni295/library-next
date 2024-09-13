import { Props } from '@/app/lib/definitions';
import Link from 'next/link';

export function Card({ id, img, name, price }: CardProps) {
  const url = `/product/${id}`;
  return (
    <Link href={url}>
      <div className="grid justify-items-center shadow-lg  bg-stale-50 hover:shadow-black-100">
        <img src={img} alt={name} width={30} height={30} />
        <p className="text-lg">{name}</p>
        <p className="text-2xl text-slate-300">$ {price}</p>
      </div>
    </Link>
  );
}

export interface CardProps extends Props {
  id: string;
  img: string;
  name: string;
  price: number;
  saleType: string;
}
