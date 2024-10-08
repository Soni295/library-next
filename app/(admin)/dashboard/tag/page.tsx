import { tagCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { Pagination } from '@/app/ui/pagination';
import { TagTable } from './components';

export default async function TagPage({ searchParams }: SearchParams) {
  const page = searchParams.page || '1';
  const pageSize = searchParams.pageSize || '10';
  const name = searchParams.name || '';

  const data = await tagCtrl.getByFilter({
    page: Number(page),
    pageSize: Number(pageSize),
    text: name as string,
  });

  return (
    <>
      <TagTable tags={data.data} />
      <Pagination totalPages={data.totalPages} />
    </>
  );
}
