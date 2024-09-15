import clsx from 'clsx';

export function Spinner({ className = '' }: { className?: string }) {
  const classStyle = clsx(
    'inline-block rounded-full align-[-0.125em]',
    'border-4 border-solid border-current border-e-transparent',
    'animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]',
    'h-8 w-8',
    className,
  );

  return <div className={classStyle}></div>;
}

export function SpinnerMain({ className = '' }: { className?: string }) {
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <Spinner className={className} />
    </div>
  );
}
