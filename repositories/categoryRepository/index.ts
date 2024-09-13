import prisma from '@/app/lib/db/prisma';
import { Category } from '@prisma/client';
import { CategoryUpdate } from '@/app/lib/definitions/models/category';

export class CategoryRepository {
  async save(category: Category) {
    return await prisma.category.create({
      data: { name: category.name },
    });
  }

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
}
