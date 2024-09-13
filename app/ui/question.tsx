import clsx from 'clsx';
import { Props } from '../lib/definitions';

interface QuestionProps extends Props {
  msg: string;
  className?: string;
}

export function Question({ msg, className = '' }: QuestionProps) {
  const classN = clsx(
    'bg-yellow-100',
    'h-[1.8rem] w-[1.8rem]',
    'text-center',
    'fond-black',
    'text-yellow-600',
    'inline-block',
    'rounded-full',
    'border-solid',
    'grid items-center',
    'pointer',
    className,
  );

  return (
    <div className={classN}>
      <span className="fond-black" title={msg}>
        ?
      </span>
    </div>
  );
}

export function PQuestion({ msg, children, className = '' }: QuestionProps) {
  return (
    <div className={className}>
      {' '}
      {children} <Question msg={msg} />{' '}
    </div>
  );
}
