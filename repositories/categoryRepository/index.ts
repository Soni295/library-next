import prisma from '@/app/lib/db/prisma';
import { injectable } from 'inversify';
import { SearchFilterCategory } from '..';

@injectable()
export class CategoryRepository {
  async save({ name }: { name: string }) {
    return await prisma.category.create({ data: { name } });
  }

  async update({ name, id }: { id: number; name: string }) {
    console.log({ name, id });
    return await prisma.category.update({ where: { id }, data: { name } });
  }

  async getById(categoryId: number) {
    return await prisma.category.findFirst({ where: { id: categoryId } });
  }

  async getCategoryByFilter({
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

  /*

  async getAll() {
    return await prisma.category.findMany({
      where: { deletedAt: null },
    });
  }

  async deleteById(categoryId: number) {
    return await prisma.category.update({
      where: { id: categoryId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
  */
}
