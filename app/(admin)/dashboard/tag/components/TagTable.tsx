import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { TagInfo } from './interface';
import { TagRow } from './TagRow';

export function TagTable({ tags }: TagTableProps) {
  return (
    <Table>
      <THead>
        <Th>ID</Th>
        <Th>Nombre</Th>
        <Th>Categoria</Th>
      </THead>
      <TBody>
        {tags.map((tag) => (
          <TagRow key={tag.id + tag.name} tag={tag} />
        ))}
      </TBody>
    </Table>
  );
}

interface TagTableProps {
  tags: TagInfo[];
}
