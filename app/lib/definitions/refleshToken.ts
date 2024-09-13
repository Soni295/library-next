import { UserPrisma } from '@/app/lib/db/prisma';

export interface RefleshToken {
  sub: number;
  iat: number;
  exp: number;
  role: UserPrisma['role'];
}
