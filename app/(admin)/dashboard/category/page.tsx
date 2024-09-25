import Link from 'next/link';
import { categoryCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { NotFound } from '@/app/ui/notFound';
import { Pagination } from '@/app/ui/pagination';
import { Row, TBody, THead, Table, Td, Th } from '@/app/ui/tables';
import { SearchInput } from '../product/_components/SearchInput';

export default async function CategoryPage({ searchParams }: SearchParams) {
  const page = searchParams.page || '1';
  const pageSize = searchParams.pageSize || '10';
  const name = searchParams.name || '';

  const data = await categoryCtrl.getCategoriesByFilter({
    page: Number(page),
    pageSize: Number(pageSize),
    text: name as string,
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <SearchInput nameDefault={name as string} />
      <CategoryTable data={data.data} totalPages={data.totalPages} />
    </div>
  );
}

function CategoryTableEmpty() {
  return (
    <NotFound
      msgLink="por favor cree una categoria"
      msg="No hay categorias disponibles"
      href={DASHBOARD_PATH.CATEGORY_CREATE}
    />
  );
}

function CategoryTable({
  data,
  totalPages,
}: {
  totalPages: number;
  data: { id: number; name: string }[];
}) {
  if (data.length === 0) return <CategoryTableEmpty />;

  return (
    <>
      <Table>
        <THead>
          <Th>ID</Th>
          <Th>Nombre</Th>
        </THead>
        <TBody>
          {data.map((p) => (
            <CategoryField key={p.id + 'category'} id={p.id} name={p.name} />
          ))}
        </TBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}

function CategoryField({ id, name }: { id: number; name: string }) {
  return (
    <Row>
      <Td className="text-right">
        <Link href={`${DASHBOARD_PATH.CATEGORY}/${id}`}>{id}</Link>
      </Td>
      <Td>{name}</Td>
    </Row>
  );
}
