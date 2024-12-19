import prisma from '@/app/lib/db/prisma';
import { SearchFilterCategory } from './types';

export async function getAllCategoriesByFilter({
  page = 1,
  pageSize = 20,
  text = '',
}: SearchFilterCategory) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = {
    OR: [{ name: { contains: text } }],
  };

  const data = await prisma.category.findMany({
    where,
    skip,
    take,
  });

  const totalItems = await prisma.category.count({ where });
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}
