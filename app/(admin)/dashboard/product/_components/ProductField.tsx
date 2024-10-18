import Link from 'next/link';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { Row, Td } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';

export function ProductField({ info }: { info: ProductPage['data'][0] }) {
  return (
    <Row>
      <Td className="text-right">
        <Link href={`${DASHBOARD_PATH.PRODUCT}/${info.id}`}>{info.id}</Link>
      </Td>
      <Td title={info.name}>{info.name}</Td>
      <Td>{info.mark?.name ? info.mark.name : 'no tiene'}</Td>
      {
        <Td className={info.enable ? 'bg-green-300' : 'bg-red-300'}>
          {info.enable ? 'Disponible' : 'No disponible'}
        </Td>
      }
      <Td className="text-right">{Number(info.basePrice).toFixed(2)}</Td>
      <Td className="text-center">{Number(info.quantity)}</Td>
      <Td className="text-center">{Number(info.minQuantity)}</Td>
    </Row>
  );
}
