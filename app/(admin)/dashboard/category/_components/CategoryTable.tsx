import { Pagination } from '@/app/ui/pagination';
import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { CategoryTableEmpty } from './CategoryTableEmpty';
import { CategoryField } from './CategoryField';

export function CategoryTable({ data, totalPages }: CategoryTableProps) {
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

interface CategoryTableProps {
  totalPages: number;
  data: { id: number; name: string }[];
}
