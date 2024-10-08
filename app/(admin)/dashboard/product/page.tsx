import Link from 'next/link';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { Row, TBody, THead, Table, Td, Th } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';
import { Question } from '@/app/ui/question';
import { Pagination } from '@/app/ui/pagination';
import { NotFound } from '@/app/ui/notFound';
import { SearchInput } from './_components/SearchInput';
import { productCtrl } from '@/app/lib/compose/inversify';
import { SearchParams } from '@/app/lib/definitions/SearchParams';

function ProductsTableEmpty() {
  return (
    <NotFound
      msgLink="por favor cree un producto"
      msg="No hay productos"
      href={DASHBOARD_PATH.PRODUCTS_CREATE}
    />
  );
}

function ProductField({ info }: { info: ProductPage['data'][0] }) {
  return (
    <Row>
      <Td className="text-right">
        <Link href={`${DASHBOARD_PATH.PRODUCT}/${info.id}`}>{info.id}</Link>
      </Td>
      <Td>{info.name}</Td>
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
            <ProductField key={p.id + 'product'} info={p} />
          ))}
        </TBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default async function ProductPage({ searchParams }: SearchParams) {
  const page = searchParams.page || '1';
  const pageSize = searchParams.pageSize || '10';
  const name = searchParams.name || '';

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
