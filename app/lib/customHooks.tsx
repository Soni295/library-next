import { useState } from 'react';

export function useToggle(state: boolean = false) {
  const [value, setValue] = useState(state);
  const toggle = (mockValue?: boolean) => {
    if (mockValue == undefined) {
      setValue((prev) => !prev);
      return;
    }
    setValue(mockValue);
  };
  return [value, toggle] as const;
}
