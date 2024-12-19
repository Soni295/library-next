import { getSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { PATH } from '@/app/lib/paths';
import { orderCtrl } from '@/app/lib/compose/inversify';
import { ItemCard } from './components/ItemCard';

export default async function CartPage() {
  const user = await getSession();
  if (!user) redirect(PATH.CLIENT.HOME);
  const purchase = await orderCtrl.getOrdenByUserId({ id: user.id });

  const items =
    purchase?.orderItems.map(({ product, quantity }) => ({
      id: product.id,
      name: product.name,
      photo: product.photo,
      pricePerUnit: product.basePrice.toNumber(),
      quantity: quantity,
      price: product.basePrice.toNumber() * quantity,
    })) || [];

  const totalPrice = items.reduce((acc, { price }) => acc + price, 0);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Productos</h2>
            {items.map((item) => (
              <ItemCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">Subtotal:</p>
              <p className="text-lg font-semibold">$ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-lg font-semibold">$ {totalPrice.toFixed(2)}</p>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 w-full rounded-lg mt-6 hover:bg-blue-700">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
