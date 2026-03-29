import { DASHBOARD_PATH } from '@/app/lib/paths';
import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';
import { NotFound } from '@/app/ui/notFound';
import { ProductField } from './ProductField';

export function ProductTable({ data }: ProductPage) {
  if (data.length === 0)
    return (
      <NotFound
        msgLink="por favor cree un producto"
        msg="No hay productos"
        href={DASHBOARD_PATH.PRODUCTS_CREATE}
      />
    );

  console.log(data);
  return (
    <Table>
      <THead>
        <Th>ID</Th>
        <Th>Nombre</Th>
        <Th>Marca</Th>
        <Th>Disponible</Th>
      </THead>
      <TBody>
        {data.map((p) => (
          <ProductField key={p.id + 'product'} info={p} />
        ))}
      </TBody>
    </Table>
  );
}
