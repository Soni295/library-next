import prisma from '@/app/lib/db/prisma';
import { SearchFilterProductStock } from './types';

export async function getAllProductsByFilter({
  pageSize,
  page,
  text,
}: SearchFilterProductStock) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = {
    OR: [{ name: { contains: text } }],
  };

  const data = await prisma.product.findMany({
    where,
    skip,
    take,
    include: { mark: true },
  });

  const totalItems = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}
