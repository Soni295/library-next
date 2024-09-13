import {
  PrismaClient,
  User,
  Order,
  Product,
  Mark,
  Category,
} from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
export type UserPrisma = User;
export type UserId = Pick<User, 'id'>;

export type ProductPrisma = Product;
export type MarkPrisma = Mark;
export type CategoryPrisma = Category;
export type OrderPrisma = Order;
export type OrderId = Pick<User, 'id'>;
