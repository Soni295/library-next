'use client';

import clsx from 'clsx';
import { MarkCreateForm } from '../_components/MakeForm';
import { redirect } from 'next/navigation';
import { can } from '@/app/lib/can';
import { useAuth } from '@/app/lib/usehook/useAuth';
import { DASHBOARD_PATH } from '@/app/lib/paths';

export default function MarkCreatePage() {
  const session = useAuth();
  if (!session) return <></>;

  if (!can(session.user, 'create_mark')) {
    redirect(DASHBOARD_PATH.MARK);
  }

  const className = clsx(
    'h-[calc(100vh-7rem)]',
    'flex',
    'justify-center',
    'items-center',
  );
  return (
    <div className={className}>
      <MarkCreateForm />
    </div>
  );
}
