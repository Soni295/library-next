'use client';

import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user;

  function can(permission: string) {
    return user?.permissions?.includes(permission) ?? false;
  }

  function canSome(permission: string[]) {
    return user?.permissions?.some((p) => permission.includes(p));
  }

  return {
    user,
    isLoading: status === 'loading',
    can,
    canSome,
  };
}
