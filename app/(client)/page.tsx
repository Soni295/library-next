import Link from 'next/link';
import { CLIENT_PATH } from '../lib/paths';
import { ProductRepository } from '@/repositories/productRepository';
import { productCtrl } from '../lib/compose/inversify';

const ProductsNotFound = () => (
  <div className="h-full w-full mt-20 md:text-5xl text-xl flex self-center justify-center">
    <p className="text-center text-inactive-light">
      No se han encontrado productos
    </p>
  </div>
);

export default async function Home() {
  const product = await productCtrl.getById(1);
  //	const info2 = await ProductRepository.getProducts(1, 20);
  /*y
	const data = await fetch('http://localhost:3001/products/', {
		cache: 'no-cache',
	});
	const info = (await data.json()) as {
		id: number;
		name: string;
		price: number;
		photos: string[];
	}[];
	return <CardConteiner elements={info2.data} />;
  */
  return <div>hola</div>;
}

export function CardConteiner({ elements }: CardContainerProps) {
  if (!elements) return <ProductsNotFound />;

  return (
    <div className="grid gap-4 mt-8 justify-items-center grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
      {elements.map((element) => (
        <Card key={element.id} {...element} />
      ))}
    </div>
  );
}

interface ClientProduct {
  id: number;
  name: string;
  photos: string[];
  price: number;
}

interface CardContainerProps {
  elements: ClientProduct[] | null;
}

export function Card({ id, photos, name, price }: ClientProduct) {
  return (
    <Link href={CLIENT_PATH.PRODUCT + '/' + id}>
      <div className="grid grid-rows-3 items-center w-[18em] h-[25em] rounded-md border-[0.250rem] border-[#d5f6fb] text-center p-2">
        <div className="h-[95%] row-span-2">
          <img className="object-cover h-[100%] w-[100%]" src={photos[0]} />
        </div>
        <div className="grid row-span-1">
          <p className="my-2 text-secondary-fontLight">{name}</p>
          <p className="text-2xl">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

export interface CardProps {
  id: number;
  name: string;
  photos: string;
  // category: string;
  // title: string;
  // price: number;
}
