'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { TBody, THead, Table, Th } from '@/app/ui/tables';
import { MarkRow } from './_components/markRow';
import { MarkPage } from '@/repositories/markRepository';
import { DASHBOARD_PATH, SERVER_PATH } from '@/app/lib/paths';
import { NotFound } from '@/app/ui/notFound';
import { Pagination } from '@/app/ui/pagination';
import { LoadingInfo } from '@/app/ui/loadingInfo';

function useMarkSearch() {
  const [info, setInfo] = useState<MarkPage & { state: string }>({
    data: [],
    page: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 1,
    state: 'IDLE',
  });

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    async function fetchInfo() {
      try {
        const url = new URLSearchParams('');
        url.set('page', currentPage);
        const urlSearch = url.toString();
        const res = await axios.get<MarkPage>(
          `${SERVER_PATH.MARK}?${urlSearch}`,
        );
        setInfo({ ...res.data, state: 'OK' });
      } catch (err) {
        console.log(err);
      }
    }
    fetchInfo();
  }, [currentPage]);

  return [info];
}

export default function DashboardMarkPage() {
  const [data] = useMarkSearch();

  if (data.state == 'IDLE') return <LoadingInfo />;
  if (data.data.length === 0)
    return (
      <NotFound
        status=""
        msgLink="por favor cree una marca"
        msg="No hay marcas"
        href={DASHBOARD_PATH.MARK_CREATE}
      />
    );

  return (
    <>
      <div className="flex-grow">
        <div className="flex mt-[3rem] flex-col justify-center">
          <Table>
            <THead>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>icono</Th>
              <Th>Activo</Th>
            </THead>
            <TBody>
              {data.data.map((mark) => (
                <MarkRow key={`mark-${mark.id}`} {...mark} />
              ))}
            </TBody>
          </Table>
        </div>
      </div>
      <Pagination totalPages={data.totalPages} />
    </>
  );
}
