import { productClientCtrl, productCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { CardAction } from './component';
import { DeleteBtn } from '@/app/ui/input/DeleteBtn';
import { NotFoundProductPage } from './notFoundPage';

export default async function Page(searchParams: SearchParams) {
  const { productId } = searchParams.params;
  const id = Number(productId);
  if (!productId || Number.isNaN(id)) return <NotFoundProductPage />;

  const product = await productClientCtrl.getById(id);
  if (!product) return <NotFoundProductPage />;

  const addProduct = () => {
    console.log({ productId });
  };
  console.log(product);
  return (
    <div className="m-auto mx-[1.5rem] p-[0.75rem] h-full w-full grid grid-cols-3 bg-red-100 rounded">
      <img
        className="object-cover ml-[2rem] h-[20rem] w-[20rem] rounded-sm"
        src={product.photo}
        alt={product.name}
      />
      <div className="col-span-2 ml-[9rem] mx-8">
        <p className="text-3xl mt-[0.7rem] font-semibold">{product.name}</p>
        <p>{product.description}</p>
        <p className="text-xl font-medium">$ {product.basePrice.toFixed(2)}</p>

        <CardAction id={product.id} />
        <button onClick={}>Agregar</button>
        <DeleteBtn text="Quitar de la lista " />
      </div>
    </div>
  );
}
function AddProductBtn() {
  return <></>;
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
