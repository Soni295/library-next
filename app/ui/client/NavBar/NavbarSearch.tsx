'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

import { CLIENT_PATH } from '@/app/lib/paths';

type genericEvent = { preventDefault(): void };

export function NavbarSearch() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSubmit = (e: genericEvent) => {
    e.preventDefault();
    router.push(`${CLIENT_PATH.SEARCH}?q=${search}`);
  };

  return (
    <form className="flex mx-2 rounded-lg bg-gray-50  pr-2" onSubmit={onSubmit}>
      <input
        className="border-0 rounded-lg w-[200px] transparent md:w-[260px] px-3"
        type="text"
        placeholder="Que estas buscando?"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <Image
        className="basis-[auto] hidden sm:inline-block"
        src="/asseps/lupa.png"
        alt="lupa"
        width={25}
        height={25}
        onClick={onSubmit}
      />
    </form>
  );
}
