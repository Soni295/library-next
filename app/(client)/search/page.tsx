'use client';

import { SERVER_PATH } from '@/app/lib/paths';
import { useSearchParams } from 'next/navigation';

export async function loadSearchClientQuery(query: string) {
  try {
    const data = await fetch(`${SERVER_PATH.SEARCH_CLIENT}?q=${query}`);
    const info = await data.json();
    console.log(info);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default async function Search() {
  const searchParams = useSearchParams();
  const a = searchParams.get('q') as string;
  const aaa = await loadSearchClientQuery(a);

  return <div>{a}</div>;
}
