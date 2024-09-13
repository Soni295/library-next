'use client';

import { CLIENT_PATH } from '@/app/lib/paths';
import { CartState } from '@/app/lib/static';
import Image from 'next/image';
import Link from 'next/link';

export function Cart({ items, total }: CartState) {
  return (
    <div className="container md:mx-auto mt-8">
      <h1 className="text-2xl text-center md:text-left font-bold mb-4">
        Carrito de Compras
      </h1>
      <table className="min-w-full bg-white bg-brand-light">
        <thead>
          <tr>
            <th className="py-2 text-center md:text-left px-8 border-b">
              Articulo
            </th>
            <th className="py-2 text-center md:px-4 border-b">Cantidad</th>
            <th className="py-2 text-center md:px-4 border-b">Precio</th>
            <th className="py-2 hidden md:table-cell text-left px-4 border-b">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {/*
<td className="py-2 px-4 border-b"><Image height={40} width={40} alt={item.name} src={item.photos[0]}/></td>
                */}
              <td className="py-2 px-4 border-b">
                <Link
                  className="flex flex-col items-center"
                  href={CLIENT_PATH.PRODUCT + '/' + item.id}
                >
                  <img
                    className="hidden md:inline  md:h-[120px] md:w-[120px]"
                    alt={item.name}
                    src={item.photos[0]}
                  />
                  <p className="truncate text-sm md:text-base">{item.name}</p>
                </Link>
              </td>
              <td className="md:px-4 text-sm md:text-base text-center border-b">
                {item.quantity}
              </td>
              <td className="md:px-4 text-sm md:text-base text-center border-b">
                ${item.price.toFixed(2)}
              </td>
              <td className="hidden md:table-cell px-4 border-b">
                $ {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-8 text-center py-5 md:text-left font-bold">
              Total
            </td>
            <td></td> <td className="hidden md:table-cell"></td>
            <td className="font-bold text-center py-5 md:text-left md:px-4 ">
              $ {total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
/*
        {/*
        <tfoot>
          <tr className="grid grid-cols-4">
            <td className="col-span-3 py-2 px-4 border-t font-bold" colSpan={2}>Total</td>
            <td className="py-2 px-4 border-t">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
        }
*/
