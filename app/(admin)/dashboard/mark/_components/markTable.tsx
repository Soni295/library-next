import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { MarkRow } from './markRow';
import { MarkPrisma } from '@/app/lib/db/prisma';
import { Omit } from '@prisma/client/runtime/library';

export function MarkTable({ marks }: MarkTableProps) {
  return (
    <Table>
      <THead>
        <Th>ID</Th>
        <Th>Nombre</Th>
        <Th>icono</Th>
      </THead>
      <TBody>
        {marks.map((mark) => (
          <MarkRow key={`mark-${mark.id}`} {...mark} />
        ))}
      </TBody>
    </Table>
  );
}

interface Mark extends Omit<MarkPrisma, 'createAt' | 'updateAt' | 'deleteAt'> {}

interface MarkTableProps {
  marks: Mark[];
}
