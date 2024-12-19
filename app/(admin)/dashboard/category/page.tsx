import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { Pagination } from '@/app/ui/pagination';
import { SearchInput } from '../product/_components/SearchInput';
import { getAllCategoriesByFilter } from '@/app/lib/fetch';
import { CategoryTable } from './_components/CategoryTable';

export default async function CategoryPage({ searchParams }: SearchParams) {
  const page = Number(searchParams.page || '1');
  const pageSize = Number(searchParams.pageSize || '10');
  const name = (searchParams.name || '') as string;

  const data = await getAllCategoriesByFilter({
    page,
    pageSize,
    text: name,
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <SearchInput nameDefault={name} />
      <CategoryTable data={data.data} totalPages={data.totalPages} />
      <Pagination totalPages={data.totalPages} />
    </div>
  );
}
