'use client';

import { useRouter } from 'next/navigation';
import { useInputNumber } from '@/app/lib/customHooks/useInputNumber';
import { DeleteBtn } from '@/app/ui/input/DeleteBtn';
import { addProductAction, deleteProductAction } from './action';
import { CLIENT_PATH } from '@/app/lib/paths';
import { toastSuccess } from '@/app/ui/toast';

interface CardActionProps {
  productId: number;
  userId?: number;
  name: string;
}

export function CardAction({ productId, userId, name }: CardActionProps) {
  const { handleDecrement, handleIncrement, quantity, handleChange } =
    useInputNumber(1);
  const router = useRouter();

  const addProduct = async () => {
    if (!userId) {
      router.push(CLIENT_PATH.SIGN_IN);
      return;
    }
    const a = await addProductAction({ productId, userId, quantity });

    const msg = quantity === 1 ? 'elemento' : 'elementos';
    toastSuccess(`Se han agregado ${quantity} ${msg} a la canasta.`);
    console.log(a);
  };

  const deleteAction = () => {
    if (!userId) {
      router.push(CLIENT_PATH.SIGN_IN);
      return;
    }
    const a = deleteProductAction({ productId, userId });
    toastSuccess(`Se quito ${name} de la canasta.`);
  };

  return (
    <div className="grid items-center py-2">
      <div className="grid items-center">
        <div className="flex items-center">
          <ActionBtn onClick={handleDecrement} placeholder="-" />
          <input
            className="w-[2.7rem] text-xl px-2 py-1 text-center border-t border-b border-gray-300 focus:outline-none"
            type="number"
            min="1"
            value={quantity}
            onChange={handleChange}
          />
          <ActionBtn onClick={handleIncrement} placeholder="+" />
        </div>
        <button
          className="bg-red-400 m-auto mt-[1rem] px-[2rem] py-[0.1rem] rounded-xl cursor-pointer"
          onClick={addProduct}
        >
          Agregar
        </button>
        <DeleteBtn text="Quitar de la lista" onClick={deleteAction} />
      </div>
    </div>
  );
}

export function ActionBtn({ onClick, placeholder }: ActionBtnProps) {
  return (
    <button
      className="px-2 py-1 text-gray-600 bg-gray-200 rounded-r hover:bg-gray-300"
      onClick={onClick}
    >
      <span className="text-xl font-extrabold">{placeholder}</span>
    </button>
  );
}

interface ActionBtnProps {
  onClick: () => void;
  placeholder: string;
}
