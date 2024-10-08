import { inject, injectable } from 'inversify';
import { TypesCompose } from '@/app/lib/compose';
import { GeneralController } from '@/controllers/mainController';
import { TagRepository } from '@/repositories/tagRepository';
import { SearchFilterByText } from '@/repositories';

@injectable()
export class TagController extends GeneralController {
  constructor(
    @inject(TypesCompose.tagRepo)
    private readonly tagRepo: TagRepository,
  ) {
    super();
  }

  async getById(id: number) {
    return this.tagRepo.getById(id);
  }

  async getByName(name: string) {
    return this.tagRepo.getByName(name);
  }

  async getByFilter(pageSearchFilter: SearchFilterByText) {
    return this.tagRepo.getByFilter(pageSearchFilter);
  }

  async save(formData: FormData) {
    const data = {
      name: formData.get('name') as string,
      categoryId: Number(formData.get('categoryId')),
    };
    return this.tagRepo.create(data);
  }

  async update(formData: FormData) {
    const data = {
      id: Number(formData.get('id')),
      name: formData.get('name') as string,
      categoryId: Number(formData.get('categoryId')),
    };
    return this.tagRepo.update(data);
  }

  async deleteById(id: number) {
    return this.tagRepo.deleteById(id);
  }
}
