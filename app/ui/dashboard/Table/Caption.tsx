import { Props } from '@/app/lib/definitions';

export function Caption({ children }: Props) {
  return (
    <caption className="p-[1rem] text-left text-2xl font-extrabold bg-slate-300">
      {children}
    </caption>
  );
}
