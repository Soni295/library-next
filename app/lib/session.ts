import { getServerSession } from 'next-auth';
import { userCtrl } from './compose/inversify';
import prisma from './db/prisma';

export async function getSession() {
  const simpleSession = await getServerSession();
  if (!simpleSession?.user?.email) return null;
  return await userCtrl.getUserByEmail(simpleSession.user.email);
}

export async function getUserPermissions(userId: number) {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  const permissions = new Set<string>();

  roles.forEach((r) => {
    r.role.permissions.forEach((p) => {
      permissions.add(p.permission.name);
    });
  });

  return [...permissions];
}
