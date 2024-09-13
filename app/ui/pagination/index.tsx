'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { NextArrow, PrevArrow } from './arrow';
import { PaginationButton } from './paginationButton';
import { PaginationItem } from './paginationItem';
import { generatePagination } from './paginationLogic';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (currentPage == 1 && totalPages == 1) return <></>;

  const pagesItem = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages < 2) return <></>;

  return (
    <div className="flex items-center gap-4 my-auto mx-auto mt-[3rem]">
      <div className="flex items-center gap-2">
        <PaginationButton
          href={createPageUrl(currentPage - 1)}
          disabled={1 == currentPage}
        >
          <PrevArrow />
          Prev
        </PaginationButton>
        {pagesItem.map((page) => (
          <PaginationItem
            key={'page-' + page.page}
            disabled={page.disabled}
            page={page.page}
            href={createPageUrl(page.page)}
          />
        ))}
        <PaginationButton
          href={createPageUrl(currentPage + 1)}
          disabled={totalPages == currentPage}
        >
          Next
          <NextArrow />
        </PaginationButton>
      </div>
    </div>
  );
}
