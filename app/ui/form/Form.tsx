import { FormEventHandler } from 'react';
import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

export function Form({ onSubmit, children, className }: FormProps) {
  const formClass = clsx(
    'p-6 shadow-lg bg-secondary-light rounded-md',
    'flex flex-col align-center',
    className,
  );
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className={formClass} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

interface FormProps extends PropsWithClassName {
  onSubmit: FormEventHandler<HTMLFormElement>;
}
