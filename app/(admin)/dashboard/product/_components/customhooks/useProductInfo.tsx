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
  tags: [],
};

export function useProductInfo(data: IproductInfo = defaultValues) {
  const [state, setState] = useState<IproductInfo>(data);

  function addTag(tag: { id: number; name: string }) {
    setState((prev) => ({ ...prev, tags: prev.tags.concat(tag) }));
  }

  const handleChange = (e: ChangeEv) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return [state, handleChange, addTag] as const;
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
  tags: { id: number; name: string }[];
}

type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;
