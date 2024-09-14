import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Td } from '@/app/ui/tables';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { MarkPrisma } from '@/app/lib/db/prisma';

export function MarkRow({ id, name, icon, enable }: MarkRowProps) {
  const className = clsx('h-[5rem]', {
    //'text-slate-400': !enable,
    'bg-red-300': !enable,
    'bg-green-300': enable,
  });
  return (
    <Row className={className}>
      <TdId id={id} />
      <Td>{name}</Td>
      <TdIcon name={name} icon={icon} />
      <Td className="text-center">{enable ? 'Activo' : 'No Activo'}</Td>
    </Row>
  );
}

function TdId({ id }: { id: number }) {
  const className = clsx('hover:font-bold', 'text-xl', 'px-2');
  const href = `${DASHBOARD_PATH.MARK}/${id}`;
  return (
    <Td>
      <Link className={className} href={href}>
        {id}
      </Link>
    </Td>
  );
}

function TdIcon({ name, icon }: TdIconProps) {
  const className = clsx('m-auto h-[4.5rem] w-[4.5rem]');

  if (!icon) return <Td>No Icono</Td>;
  return (
    <Td>
      <Image
        className={className}
        width={40}
        height={40}
        src={icon}
        alt={name}
      />
    </Td>
  );
}

interface MarkRowProps
  extends Omit<MarkPrisma, 'createAt' | 'updateAt' | 'deleteAt'> {}
interface TdIconProps extends Pick<MarkRowProps, 'name' | 'icon'> {}
interface TdNameProps extends Pick<MarkRowProps, 'name' | 'id'> {}
