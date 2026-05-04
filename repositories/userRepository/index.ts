import { injectable } from 'inversify';
import { Maybe } from '@/app/lib/definitions/general';
import { UserCreateInputServer } from '@/app/lib/definitions/user';
import prisma, { UserPrisma } from '@/app/lib/db/prisma';

export type MaybeUser = Maybe<UserPrisma>;

@injectable()
export class UserRepository {
  async save(user: UserCreateInputServer): Promise<UserPrisma | null> {
    const count = await this.countOfUsers();
    let name = 'viewer';
    if (count === 0) name = 'admin';
    return prisma.user.create({
      data: { ...user, roles: { create: { role: { connect: { name } } } } },
    });
  }

  async getRolesByUserId(id: number) {
    return prisma.userRole
      .findMany({
        where: { user: { id: id } },
        include: { role: true },
      })
      .then((info) => info.map((i) => i.role));
  }

  async getUserById(id: number): Promise<UserPrisma | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserPermissions(userId: number) {
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

  async getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { roles: true },
    });
    if (!user) return null;
    const role = await prisma.role.findMany({
      where: { id: { in: user.roles.map((r) => r.roleId) } },
    });

    console.log(role);
    return user;
  }

  async countOfUsers(): Promise<number | null> {
    return await prisma.user.count();
  }
}
