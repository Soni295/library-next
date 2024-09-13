import { ChangeEvent } from 'react';
import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

interface ImagenButtonProps extends PropsWithClassName {
  msg: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ImagenButton({
  className = '',
  msg,
  handleImageChange,
}: ImagenButtonProps) {
  const cls = clsx('mt-[1rem] flex items-center', className);
  return (
    <div className={cls}>
      <label
        className="bg-blue-400 m-auto px-[1rem] py-[0.1rem] rounded-xl cursor-pointer"
        htmlFor="image"
      >
        {msg}
      </label>
      <input
        id="image"
        className="border inline-block pointer none"
        name="imagen"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
}
