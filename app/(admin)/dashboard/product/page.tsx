import { type ProductPage } from '@/repositories';
import { Pagination } from '@/app/ui/pagination';
import { SearchInput } from './_components/SearchInput';
import { productCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { ProductTable } from './_components/ProductTable';

export default async function ProductPage({ searchParams }: SearchParams) {
  const page = searchParams.page || '1';
  const pageSize = searchParams.pageSize || '10';
  const name = searchParams.name || '';

  const data = await productCtrl.getProductsByFilter({
    page: Number(page),
    pageSize: Number(pageSize),
    text: name as string,
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <SearchInput nameDefault={name as string} />
      <ProductTable {...data} />
      <Pagination totalPages={data.totalItems} />
    </div>
  );
}
