// lib/auth-server.ts

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function requirePermission(permission: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('No actualizado');
  }
  if (!session.user.permissions.includes(permission)) {
    throw new Error('No tiene credenciales para la accion');
  }
  return session.user;
}
