import { DASHBOARD_PATH } from '@/app/lib/paths';
import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';
import { Question } from '@/app/ui/question';
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

  return (
    <Table>
      <THead>
        <Th>ID</Th>
        <Th>Nombre</Th>
        <Th>Marca</Th>
        <Th>Disponible</Th>
        <Th>Precio Base</Th>
        <Th>Stock</Th>
        <Th className="flex items-center">
          <p className="pr-[0.25rem]">Cantidad minima</p>{' '}
          <Question
            className="mx-[0.25rem] h-[0.84rem] w-[0.84rem] text-xs"
            msg="si el stock es menor a la cantidad minima automaticamente pasa a la lista de pedidos"
          />
        </Th>
      </THead>
      <TBody>
        {data.map((p) => (
          <ProductField key={p.id + 'product'} info={p} />
        ))}
      </TBody>
    </Table>
  );
}
