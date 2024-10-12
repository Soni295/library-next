import { ChangeEvent, useState } from 'react';

const defaultValues = {
  name: '',
  basePrice: undefined,
  description: '',
  quantity: 0,
  minQuantity: 0,
  code: '',
  mark: 'No asignada',
  enable: '0',
};

export function useProductInfo(productInfo: IproductInfo = defaultValues) {
  const [state, setState] = useState<IproductInfo>(productInfo);

  const handleChange = (e: ChangeEv) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return [state, handleChange] as const;
}

export interface IproductInfo {
  id?: number;
  name: string;
  basePrice?: number;
  description: string;
  quantity: number;
  minQuantity: number;
  code: string;
  mark: string;
  enable: string;
}

type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;
