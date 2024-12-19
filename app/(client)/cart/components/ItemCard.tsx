import { deleteProductAction } from '@/app/lib/actions';
import { formatPrice } from '@/app/lib/utils/formatPrice';

export function ItemCard({
  id,
  name,
  quantity,
  photo,
  price,
  pricePerUnit,
  userId,
}: ItemCardProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
      <div className="flex items-center gap-3">
        <img
          src={photo}
          alt="Producto"
          className="w-10 h-10 md:w-20 md:h-20 object-cover rounded-lg"
        />
        <div>
          <div className="flex gap-1 items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="text-sm text-gray-400 flex gap-2">
              <span>({quantity}) </span>
              <span className="hidden md:inline">precio por unidad</span>
              <span className="inline md:hidden">x</span>
              <span> ${formatPrice(pricePerUnit)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-md text-gray-400"></p>
        <p className="text-md md:text-lg font-semibold">
          ${formatPrice(price)}
        </p>
        <div className="relative h-[1.5rem] w-[1.5rem] bg-red-500 rounded-[5px]">
          <form action={deleteProductAction}>
            <input type="hidden" name="productId" value={id} />
            <input type="hidden" name="userId" value={userId} />
            <button className="absolute inset-0 flex items-center justify-center text-white text-[1rem]">
              &#x274c;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

//<button className="text-red-500 hover:underline font-semibold">Eliminar</button>
interface ItemCardProps {
  id: number;
  name: string;
  userId: number;
  descripcion?: string | null;
  photo: string;
  price: number;
  quantity: number;
  pricePerUnit: number;
}
