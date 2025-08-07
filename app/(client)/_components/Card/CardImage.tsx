import clsx from 'clsx';
import Image from 'next/image';
import { CardImageProps } from './interfaces';

export function CardImage({ photo, name }: CardImageProps) {
  const imgNotFoundStyle = clsx(
    'h-full w-full',
    'flex items-center justify-center',
    'bg-slate-100 text-slate-400',
    'border-[0.1rem] border-[#d5f6fb] rounded-sm',
  );

  return (
    <div className="h-[95%] row-span-2">
      {photo ? (
        <Image
          className="object-cover h-[100%] w-[100%]"
          src={photo}
          alt={name}
          width={100}
          height={100}
        />
      ) : (
        <div className={imgNotFoundStyle}>
          <div>Imagen no disponible</div>
        </div>
      )}
    </div>
  );
}
