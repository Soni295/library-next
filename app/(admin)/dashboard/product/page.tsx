import { type ProductPage } from '@/repositories';
import { Pagination } from '@/app/ui/pagination';
import { SearchInput } from './_components/SearchInput';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { ProductTable } from './_components/ProductTable';
import { getAllProductsByFilter } from '@/app/lib/fetch';

export default async function ProductPage({ searchParams }: SearchParams) {
  const page = Number(searchParams.page || '1');
  const pageSize = Number(searchParams.pageSize || '10');
  const name = (searchParams.name || '') as string;

  const data = await getAllProductsByFilter({
    page,
    pageSize,
    text: name,
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <SearchInput nameDefault={name} />
      <ProductTable {...data} />
      <Pagination totalPages={data.totalPages} />
    </div>
  );
}
