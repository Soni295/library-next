import { Category } from '@prisma/client';
import { CategoryRepository } from '@/repositories/categoryRepository';

export class CategoryController {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async save(category: Category) {
    return await this.categoryRepo.save(category);
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
