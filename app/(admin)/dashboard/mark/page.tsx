'use client';

import { Suspense } from 'react';
import { MarkTable } from './_components/markTable';

export function LoadingInfo() {
  return <div>Cargando...</div>;
}

export default function DashboardMarkPage() {
  return (
    <Suspense fallback={<LoadingInfo />}>
      <MarkTable />
    </Suspense>
  );
}
