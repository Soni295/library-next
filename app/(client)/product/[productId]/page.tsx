import { orderCtrl, productClientCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { CardAction } from './component';
import { NotFoundProductPage } from './notFoundPage';
import { getSession } from '@/app/lib/session';
import clsx from 'clsx';

export default async function Page(searchParams: SearchParams) {
  const session = await getSession();
  const { productId } = searchParams.params;
  const id = Number(productId);
  if (!productId || Number.isNaN(id)) return <NotFoundProductPage />;

  const product = await productClientCtrl.getById(id);
  if (!product) return <NotFoundProductPage />;

  return (
    <div className="m-auto p-[0.75rem] h-[calc(full-0.5rem)] h-[35rem] w-[calc(full-0.5rem)] grid grid-cols-1 bg-slate-100 md:grid-cols-3 rounded">
      <img
        className="object-cover m-[auto] md:ml-[2rem] h-[30rem] w-[30rem] rounded-sm"
        src={product.photo}
        alt={product.name}
      />
      <div className="col-span-2 self-center md:ml-[9rem] mx-8">
        <p className="text-2xl mt-[0.7rem] font-semibold">{product.name}</p>
        <p className="text-lg">{product.description}</p>
        <p className="text-xl font-medium">$ {product.basePrice.toFixed(2)}</p>

        <CardAction
          name={product.name}
          productId={product.id}
          userId={session?.id}
        />
      </div>
    </div>
  );
}

function ProductImg({ src, name }: { src: string; name: string }) {
  const imgNotFoundStyle = clsx(
    'h-full w-full',
    'flex items-center justify-center',
    'bg-slate-100 text-slate-400',
    'border-[0.1rem] border-[#d5f6fb] rounded-sm',
  );

  if (!src)
    return (
      <div className={imgNotFoundStyle}>
        <div>Imagen no disponible</div>
      </div>
    );

  return (
    <img
      className="object-cover m-[auto] md:ml-[2rem] h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-sm"
      src={src}
      alt={name}
    />
  );
}
