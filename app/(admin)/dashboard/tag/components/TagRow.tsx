import Link from 'next/link';

import { DASHBOARD_PATH } from '@/app/lib/paths';
import { Row, Td } from '@/app/ui/tables';
import { TagInfo } from './interface';

export function TagRow({ tag }: TagRowProps) {
  return (
    <Row>
      <Td className="text-right">
        <Link href={`${DASHBOARD_PATH.TAGS}/${tag.id}`}>{tag.id}</Link>
      </Td>
      <Td>{tag.name}</Td>
      <Td>{tag.category.name}</Td>
    </Row>
  );
}

interface TagRowProps {
  tag: TagInfo;
}
