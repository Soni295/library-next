import { TypesCompose } from '@/app/lib/compose';
import { SearchFilterCategory } from '@/repositories';
import { CategoryRepository } from '@/repositories/categoryRepository';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryController {
  constructor(
    @inject(TypesCompose.categoryRepo)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async getCategoriesByFilter(pageSearchFilter: SearchFilterCategory) {
    return this.categoryRepo.getCategoryByFilter(pageSearchFilter);
  }

  async save({ name }: { name: string }) {
    return await this.categoryRepo.save({ name });
  }

  async update({ id, name }: { id: number; name: string }) {
    return await this.categoryRepo.update({ name, id });
  }

  async getById(id: number) {
    return await this.categoryRepo.getById(id);
  }
}
