import { Props } from '@/app/lib/definitions';
import { Question } from '../question';

export function Field({
  optional = false,
  label,
  children,
  id,
  question,
}: fieldProps) {
  return (
    <div className="flex flex-col gap-y-[0.3rem] py-[0.5rem]">
      <div className="flex text-sm">
        <label className="ml-[0.2rem]" htmlFor={id}>
          {label}
          {optional && <span className="text-slate-700"> (opcional)</span>}:
        </label>
        {question && (
          <Question
            className="mx-[0.25rem] h-[0.8rem] w-[0.8rem] text-xs"
            msg={question}
          />
        )}
      </div>
      {children}
    </div>
  );
}

interface fieldProps extends Props {
  label: string;
  id: string;
  question?: string;
  optional?: boolean;
}
