import { Dispatch, SetStateAction, useId, useState } from 'react';
import { Label } from '../label';

export function InputText({ ...rest }: InputTextProps) {
  return <Input {...rest} type="text" />;
}

export function InputNumber({ ...rest }: InputNumberProps) {
  return <Input {...rest} type="number" />;
}

export function Input({
  value,
  type,
  required = false,
  name,
  set,
  placeholder,
}: InputProps) {
  const id = useId();
  const [warningMsg, setWarningMgs] = useState(false);

  return (
    <div className="grid mb-3">
      <Label htmlFor={id} name={placeholder} />
      <input
        id={id}
        type={type}
        className="bg-gray-200 md:w-[90%] text-sm rounded-md px-2 py-[4px]"
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => set(e.target.value)}
        value={value}
        onBlur={() => {
          if (!value) setWarningMgs(true);
          else setWarningMgs(false);
        }}
      />
      <span
        className={`${
          warningMsg ? 'visible' : 'invisible'
        } text-xs text-red-800 font-semibold bg-red-100 mt-1 mx-2 rounded-md px-2 w-max`}
      >
        * el {placeholder} es requerido
      </span>
    </div>
  );
}

interface InputTextProps extends Omit<InputProps, 'type'> {}
interface InputNumberProps extends Omit<InputProps, 'type'> {}

interface InputProps {
  placeholder: string;
  type?: string;
  //set: Dispatch<SetStateAction<string>>
  set: (newValue: string) => void;
  value: string;
  name: string;
  required?: boolean;
}
