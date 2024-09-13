import { useId, useState } from 'react';
import { Label } from '@/app/ui/form/label';

export function Select({
  required = false,
  name,
  selectName,
  items,
}: SelectProps) {
  const id = useId();
  const [value, setValue] = useState('0');

  return (
    <div className="grid mb-3">
      <Label htmlFor={id} name={selectName} />
      <select
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        className="bg-gray-200 md:w-[90%] text-sm rounded-md px-2 py-[4px]"
        required={required}
        onBlur={() => {}}
      >
        <option disabled value="0">
          {selectName}
        </option>
        {items.map(({ id, name }) => (
          <option key={id + name} value={id}>
            {name}
          </option>
        ))}
      </select>

      <span
        className={`${
          value === '0' ? 'visible' : 'invisible'
        } text-xs text-red-800 font-semibold bg-red-100 mt-1 mx-2 rounded-md px-2 w-max`}
      >
        * La {selectName} es requerida
      </span>
    </div>
  );
}

interface SelectProps {
  name: string;
  required?: boolean;
  selectName: string;
  items: {
    id: number;
    name: string;
  }[];
}
