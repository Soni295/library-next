import Image from 'next/image';
import clsx from 'clsx';
import { PropsWithClassName } from '@/app/lib/definitions';

interface ImageViewProps extends PropsWithClassName {
  src: string;
  alt: string;
}

export function ImagenView({ src, alt, className = '' }: ImageViewProps) {
  const cls = clsx(
    'h-[10rem] w-[10rem] m-auto',
    'text-center grid items-center',
    'bg-slate-900/30 rounded-lg',
    className,
  );

  if (src === '')
    return (
      <div className={cls}>
        <p>{alt}</p>
      </div>
    );

  return <Image className={cls} src={src} width={18} height={18} alt={alt} />;
}
