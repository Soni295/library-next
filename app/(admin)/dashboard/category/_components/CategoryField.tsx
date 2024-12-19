import Link from 'next/link';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { Row, Td } from '@/app/ui/tables';

export function CategoryField({ id, name }: CategoryFieldProps) {
  return (
    <Row>
      <Td className="text-right">
        <Link href={`${DASHBOARD_PATH.CATEGORY}/${id}`}>{id}</Link>
      </Td>
      <Td>{name}</Td>
    </Row>
  );
}

interface CategoryFieldProps {
  id: number;
  name: string;
}
