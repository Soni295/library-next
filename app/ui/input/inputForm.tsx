import { useId, InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export function InputForm({ err, label, rest, ...info }: Props) {
  const id = useId();
  return (
    <>
      <label className="block mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="border w-full rounded-lg text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-600"
        {...info}
        {...rest}
      />
      <InputErr err={err} />
    </>
  );
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  err?: FieldError;
  label: string;
  rest: UseFormRegisterReturn;
}

function InputErr({ err }: InputErrProps) {
  if (!err) return <></>;
  return <p className="px-2 text-xs text-red-500">{err.message}</p>;
}

interface InputErrProps {
  err?: FieldError;
}
