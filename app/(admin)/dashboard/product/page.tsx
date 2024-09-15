//'use client';

import { DASHBOARD_PATH } from '@/app/lib/paths';
import { Row, TBody, THead, Table, Td, Th } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';
import { Question } from '@/app/ui/question';
import { Pagination } from '@/app/ui/pagination';
import { NotFound } from '@/app/ui/notFound';
import { SearchInput } from './_components/SearchInput';
import { productCtrl } from '@/app/lib/compose/inversify';

function ProductsTableEmpty() {
  return (
    <NotFound
      msgLink="por favor cree un producto"
      msg="No hay productos"
      href={DASHBOARD_PATH.PRODUCTS_CREATE}
    />
  );
}

function ProductTable({ data, totalPages }: ProductPage) {
  if (data.length === 0) return <ProductsTableEmpty />;

  return (
    <>
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
            <Row key={'product' + p.id}>
              <Td className="text-right">{p.id}</Td>
              <Td>{p.name}</Td>
              <Td>{p.mark?.name ? p.mark.name : 'no tiene'}</Td>
              {
                <Td className={p.enable ? 'bg-green-300' : 'bg-red-300'}>
                  {p.enable ? 'Disponible' : 'No disponible'}
                </Td>
              }
              <Td className="text-right">{Number(p.basePrice).toFixed(2)}</Td>
              <Td className="text-center">{Number(p.quantity)}</Td>
              <Td className="text-center">{Number(p.minQuantity)}</Td>
            </Row>
          ))}
        </TBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ searchParams }: SearchParams) {
  const page = searchParams.page || '1';
  const pageSize = searchParams.pageSize || '10';
  const name = searchParams.name || '';

  console.log({ page, pageSize, name });
  const data = await productCtrl.getProductsByFilter({
    page: Number(page),
    pageSize: Number(pageSize),
    text: name as string,
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <SearchInput nameDefault={name as string} />
      <ProductTable {...data} />
    </div>
  );
}
