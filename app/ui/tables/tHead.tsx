import { PropsWithClassName } from '@/app/lib/definitions';

export function THead({ children }: PropsWithClassName) {
  return (
    <thead className="min-w-full leading-normal bg-blue-300 rounded-lg">
      <tr>{children}</tr>
    </thead>
  );
}
