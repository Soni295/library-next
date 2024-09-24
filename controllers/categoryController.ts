import { TypesCompose } from '@/app/lib/compose';
import { CategoryRepository } from '@/repositories/categoryRepository';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryController {
  constructor(
    @inject(TypesCompose.categoryRepo)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async save({ name }: { name: string }) {
    return await this.categoryRepo.save({ name });
  }
}
