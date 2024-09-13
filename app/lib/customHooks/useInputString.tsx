import { useState, ChangeEvent } from 'react';

type check = (e: string) => string | null;

export function useInputString(check: check) {
  const [value, setValue] = useState({ value: '', error: '' });

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue({ value: inputValue, error: '' });
  };

  return [value, handleValue] as const;
}
