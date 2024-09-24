import prisma from '@/app/lib/db/prisma';
import { injectable } from 'inversify';

@injectable()
export class CategoryRepository {
  async save({ name }: { name: string }) {
    return await prisma.category.create({ data: { name } });
  }
  /*
  async getById(categoryId: number) {
    return await prisma.category.findFirst({
      where: { id: categoryId, deletedAt: null },
    });
  }

  async getAll() {
    return await prisma.category.findMany({
      where: { deletedAt: null },
    });
  }

  async update(category: CategoryUpdate) {
    return await prisma.category.update({
      where: { id: category.id },
      data: {
        ...category,
        updateAt: new Date(),
      },
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
