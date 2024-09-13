'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SERVER_PATH } from '@/app/lib/paths';
import { Row, TBody, THead, Table, Td, Th } from '@/app/ui/tables';
import { type ProductPage } from '@/repositories';
import { Question } from '@/app/ui/question';
import { Pagination } from '@/app/ui/pagination';

function useProdcutPage() {
  const [data, setData] = useState<ProductPage>({
    data: [],
    page: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 1,
  });

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    async function fetchInfo() {
      try {
        const url = new URLSearchParams('');
        url.set('page', currentPage);
        url.set('pageSize', String(data.pageSize));
        const urlSearch = url.toString();
        const res = await axios.get<ProductPage>(
          `${SERVER_PATH.PRODUCT}?${urlSearch}`,
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInfo();
  }, [currentPage]);

  return [data];
}

export default function ProductPage() {
  const [data] = useProdcutPage();
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
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
              className="line"
              msg="si el stock es menor a la cantidad minima automaticamente pasa a la lista de pedidos"
            />
          </Th>
        </THead>
        <TBody>
          {data.data.map((p) => (
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
      <Pagination totalPages={data.totalPages} />
    </div>
  );
}
