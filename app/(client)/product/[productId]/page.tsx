'use client';

import { ClientProduct, getProductById } from '@/app/lib/static';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CLIENT_PATH } from '@/app/lib/paths';
import { useCart } from '@/app/store/useCart';

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(Number(params.productId));
  if (!product) return <div>Producto no encontrado</div>;
  return <CardProduct product={product} />;
}
interface CardProductProps {
  product: ClientProduct;
}
function CardProduct({ product }: CardProductProps) {
  return (
    <div className="m-auto mt-[5rem] w-[900px] h-[500px] grid grid-cols-3 bg-red-400  rounded-lg">
      <img
        className="object-cover h-[100%] w-[350px]"
        src={product.photos[0]}
        alt={product.name}
      />
      <div className="col-span-2 mx-8">
        <div className="mt-8">
          <p className="text-2xl my-8 text-center font-semibold">
            {product.name}
          </p>
          <p>{product.descripcion}</p>
          <p className="text-xl font-medium">$ {product.price}</p>
        </div>
        <CardAction id={product.id} />
      </div>
    </div>
  );
}

interface CardActionProps {
  id: number;
}

function CardAction({ id }: CardActionProps) {
  const inputHandler = useInputNumber();
  const { items, addItem, deleteItem } = useCart();
  const existInCart = items.some((i) => i.id === id);
  const router = useRouter();

  function purcharse() {
    addItem({ id, quantity: inputHandler.quantity });
    router.push(CLIENT_PATH.CART);
    //if(existInCart)
  }

  return (
    <div className="grid items-center max-w-xs p-2 shadow-sm">
      <div className="flex my-5">
        <InputNumberWithButtons {...inputHandler} />
        <span className="mx-2 text-xl self-center font-semibold">Cantidad</span>
      </div>
      <div>
        <button
          className="text-xl rounded-lg border px-3 py-2"
          onClick={() => addItem({ id, quantity: inputHandler.quantity })}
        >
          Agregar al Carrito
        </button>
        {existInCart && (
          <button
            className="text-xl rounded-lg border px-3 py-2"
            onClick={() => deleteItem(id)}
          >
            Eliminar del carrito
          </button>
        )}
      </div>
    </div>
  );
}

function useInputNumber(): IUseInputNumber {
  const [quantity, setQuantity] = useState(1);

  return {
    quantity,
    handleChange: (e) => {
      const value = parseInt(e.target.value, 10);
      if (value > 0) setQuantity(value);
    },
    handleIncrement: () => setQuantity((prev) => prev + 1),
    handleDecrement: () =>
      quantity - 1 > 0 ? setQuantity((prev) => prev - 1) : 1,
  } as const;
}

interface IUseInputNumber {
  quantity: number;
  handleChange: (e: { target: { value: string } }) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

function InputNumberWithButtons({
  handleIncrement,
  quantity,
  handleDecrement,
  handleChange,
}: IUseInputNumber) {
  return (
    <div className="flex items-center">
      <button
        className="px-2 py-1 text-gray-600 bg-gray-200 rounded-l hover:bg-gray-300"
        onClick={handleDecrement}
      >
        <span className="text-2xl font-extrabold">-</span>
      </button>
      <input
        className="w-16 p-2 text-center border-t border-b border-gray-300 focus:outline-none"
        type="number"
        min="0"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="px-2 py-1 text-gray-600 bg-gray-200 rounded-r hover:bg-gray-300"
        onClick={handleIncrement}
      >
        <span className="text-2xl font-extrabold">+</span>
      </button>
    </div>
  );
}

/*
function CardAction({ id }: CardActionProps) {
  const { items, addItem } = userCart()
  const existInCart = items.some(i => i.id === id)
  const [count, setCount] = useState(1)

  const router = useRouter()

  function purcharse() {
    addItem({ id, count })
    router.push(CLIENT_PATH.CART)
    //if(existInCart)
  }

  return (
    <div className='h-[50px] grid bg-blue-300'>



      <div>
        <input className='text-center' value={count}
          type="number"
          min="1"
          max="100"
          onChange={({ target }) => setCount(Number(target.value))}
        />
        <span className='mx-2'>Cantidad</span>
      </div>
      <div>
      </div>
    </div>
  )
}
*/
