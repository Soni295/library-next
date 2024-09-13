import { UserPrisma } from '@/app/lib/db/prisma';
export type MaybeSession = Pick<
  UserPrisma,
  'id' | 'name' | 'role' | 'email'
> | null;
export type Session = Pick<UserPrisma, 'id' | 'name' | 'role' | 'email'>;
