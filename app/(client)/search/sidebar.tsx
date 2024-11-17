'use client';

import { productCtrl } from '@/app/lib/compose/inversify';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function Sidebar({ categories, tIds }: SidebarPros) {
  const [tagIds, setTagIds] = useState<number[]>(tIds);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('tid')) || 1;
  console.log({ categories, tIds });

  return (
    <div className="flex flex-col bg-neutral-100 border border-solid border-neutral-400 w-60 p-3">
      {categories.map((category) => (
        <div key={category.name + category.id}>
          <h3 className="text-lg border-b border-slate-500">{category.name}</h3>
          <div>
            {category.tags.map((tag) => (
              <div key={tag.name + tag.id}>
                <p>{tag.name}</p>
                <input
                  type="checkbox"
                  value={tIds.some((t) => t == tag.id) ? 1 : 0}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <input value="aplicar filtro" />
    </div>
  );
}
interface SidebarPros {
  categories: Awaited<
    ReturnType<typeof productCtrl.getProductsByFilterForClient>
  >['data']['categories'];
  tIds: number[];
}
