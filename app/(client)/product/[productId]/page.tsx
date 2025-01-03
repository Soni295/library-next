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
  const a = await orderCtrl.getOrdenByUserId({ id: session?.id as number });

  if (!productId || Number.isNaN(id)) return <NotFoundProductPage />;

  const product = await productClientCtrl.getById(id);
  if (!product) return <NotFoundProductPage />;

  return (
    <div className="m-auto p-[0.75rem] h-[calc(full-0.5rem)] w-[calc(full-0.5rem)] grid grid-cols-1 bg-slate-100 md:grid-cols-3 rounded">
      <img
        className="object-cover m-[auto] md:ml-[2rem] h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-sm"
        src={product.photo}
        alt={product.name}
      />
      <div className="col-span-2 md:ml-[9rem] mx-8">
        <p className="text-3xl mt-[0.7rem] font-semibold">{product.name}</p>
        <p>{product.description}</p>
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
function AddProductBtn() {
  return <></>;
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

// <CardAction id={product.id} />

/*


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
*/
