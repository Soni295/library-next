import { injectable } from 'inversify';
import { Maybe } from '@/app/lib/definitions/general';
import { UserCreateInputServer } from '@/app/lib/definitions/user';
import prisma, { UserPrisma } from '@/app/lib/db/prisma';

export type MaybeUser = Maybe<UserPrisma>;

@injectable()
export class UserRepository {
  async save(user: UserCreateInputServer): Promise<UserPrisma | null> {
    const count = await this.countOfUsers();
    if (count === 0) {
      return prisma.user.create({ data: { ...user, role: 'SUPERADMIN' } });
    }
    return prisma.user.create({ data: { ...user } });
  }

  async getUserById(id: number): Promise<UserPrisma | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<UserPrisma | null> {
    return prisma.user.findFirst({ where: { email } });
  }

  async countOfUsers(): Promise<number | null> {
    return await prisma.user.count();
  }
}
