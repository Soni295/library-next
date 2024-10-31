'use client';

import { useInputNumber } from '@/app/lib/customHooks/useInputNumber';

export function CardAction({ id }: { id: number }) {
  const { handleDecrement, handleIncrement, quantity, handleChange } =
    useInputNumber();

  return (
    <div className="grid items-center max-w-xs p-2 shadow-sm">
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
    </div>
  );
}
