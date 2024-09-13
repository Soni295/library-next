import Link from 'next/link';
import clsx from 'clsx';

interface CreateButtonProps {
  href: string;
  className?: string;
}

export function CreateButton({ href, className = '' }: CreateButtonProps) {
  const classNameGeneral = clsx(
    'grid',
    'bg-green-400 text-green-700',
    'hover:bg-green-500 hover:text-green-800',
    'text-center',
    'h-[2rem] w-[2rem]',
    'rounded-full',
    className,
  );

  return (
    <Link className={classNameGeneral} href={href}>
      <p className="m-auto font-bold">+</p>
    </Link>
  );
}
