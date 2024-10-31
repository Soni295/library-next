import { useState } from 'react';

export function useInputNumber(defaultQuantity: number = 0) {
  const [quantity, setQuantity] = useState(defaultQuantity);

  return {
    quantity,
    handleChange: (e: { target: { value: string } }) => {
      const value = parseInt(e.target.value, 10);
      if (value > 0) setQuantity(value);
    },
    handleIncrement: () => setQuantity((prev) => prev + 1),
    handleDecrement: () =>
      quantity - 1 > 0 ? setQuantity((prev) => prev - 1) : 1,
  } as const;
}
