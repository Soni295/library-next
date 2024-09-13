'use client';

import { useEffect, useState } from 'react';
import { Pagination } from '@/app/ui/pagination';
import { MarkTable } from './_components/markTable';
import axios from 'axios';
import { MarkPage } from '@/repositories/markRepository';
import { useSearchParams } from 'next/navigation';
import { SERVER_PATH } from '@/app/lib/paths';

export function useMarkSearch() {
  const [info, setInfo] = useState<MarkPage>({
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
        const urlSearch = url.toString();
        const res = await axios.get<MarkPage>(
          `${SERVER_PATH.MARK}?${urlSearch}`,
        );
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInfo();
  }, [currentPage]);

  return [info];
}

export default function DashboardMarkPage() {
  const [info] = useMarkSearch();

  return (
    <>
      <div className="flex-grow">
        <div className="flex mt-[3rem] flex-col justify-center">
          <MarkTable marks={info.data} />
        </div>
      </div>
      <Pagination totalPages={info.totalPages} />
    </>
  );
}
