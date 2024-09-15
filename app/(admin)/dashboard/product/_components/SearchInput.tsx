'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function SearchInput({ nameDefault = '' }: { nameDefault: string }) {
  const [name, setName] = useState<string>(nameDefault);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const route = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('name', name);
    params.delete('page');
    const url = `${pathname}?${params.toString()}`;
    route.push(url);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="flex-1 py-[0.1em] border border-solid border-2 border-slate-600  rounded-lg pl-[0.5rem] text-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
    </form>
  );
}
