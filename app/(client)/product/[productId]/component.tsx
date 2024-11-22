'use client';

import { useInputNumber } from '@/app/lib/customHooks/useInputNumber';

export function CardAction({ id }: { id: number }) {
  const { handleDecrement, handleIncrement, quantity, handleChange } =
    useInputNumber();

  return (
    <div className="grid items-center py-2">
      <div className="flex items-center">
        <ActionBtn onClick={handleDecrement} placeholder="-" />
        <input
          className="w-[2.7rem] text-xl px-2 py-1 text-center border-t border-b border-gray-300 focus:outline-none"
          type="number"
          min="0"
          value={quantity}
          onChange={handleChange}
        />
        <ActionBtn onClick={handleIncrement} placeholder="+" />
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
