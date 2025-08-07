import { inject, injectable } from 'inversify';
import { TypesCompose } from '@/app/lib/compose';
import { MarkCreateSchema, MarkUpdateSchema } from '@/app/lib/definitions/mark';
import { handlerImgMark } from '@/app/lib/utils/handleImage';
import {
  type MarkRepository,
  PageSearchBasic,
} from '@/repositories/markRepository';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { GeneralController } from './mainController';
import { MarkPrisma } from '@/app/lib/db/prisma';

@injectable()
export class MarkController extends GeneralController {
  constructor(
    @inject(TypesCompose.markRepo)
    private readonly markRepository: MarkRepository,
  ) {
    super();
  }

  async getAll() {
    return this.markRepository.getAll();
  }

  async update(formData: FormData) {
    if (!(await this.userPermissionVerifier.isAdmin())) {
      return { error: 'no autorizado', status: '500' };
    }

    const file = formData.get('img.file') as File;
    const srcImg = formData.get('img.src') as string;

    try {
      const id = Number(formData.get('id'));
      if (!id) {
        return {
          error: 'es necesario el id',
          status: '500',
        };
      }

      const markDb = await this.markRepository.getById(id);
      if (!markDb) {
        return {
          error: 'No existe marca',
          status: '500',
        };
      }

      const data = {
        id: id,
        name: formData.get('name'),
        enable: formData.get('enable') == 'true',
        icon: srcImg,
      };

      if (markDb.icon !== srcImg) {
        const photo = await handlerImgMark.saveFile(file);
        data.icon = photo;
      }

      const validatedMark = MarkUpdateSchema.safeParse(data);
      if (!validatedMark.success) {
        return {
          error: validatedMark.error.toString(),
          status: '500',
        };
      }
      await this.markRepository.update(validatedMark.data);
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        console.error('alto error PrismaClientValidationError', err.message);
      }

      if (err instanceof Error) {
        return {
          status: '500',
          error: err.message,
        };
      }
    }

    return { status: '200' };
  }

  async save(formData: FormData) {
    if (!(await this.userPermissionVerifier.isAdmin())) {
      return { error: 'no autorizado', status: '500' };
    }

    const file = formData.get('img.file') as File;
    try {
      const iconPath = await handlerImgMark.saveFile(file);

      const data = {
        name: formData.get('name'),
        enable: formData.get('enable') == 'true',
        icon: iconPath,
      };

      const validatedMark = MarkCreateSchema.safeParse(data);
      if (!validatedMark.success) {
        return {
          error: validatedMark.error.toString(),
          status: '500',
        };
      }
      await this.markRepository.create(validatedMark.data);
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        console.error('alto error PrismaClientValidationError', err.message);
      }

      if (err instanceof Error) {
        return {
          status: '500',
          error: err.message,
        };
      }
    }

    return { status: '200' };
  }

  async getMarkByPage({ page, pageSize }: PageSearchBasic) {
    return this.markRepository.getMarkByPage({ page, pageSize });
  }

  async getById(mark: Pick<MarkPrisma, 'id'>) {
    if (!Number.isSafeInteger(mark.id)) {
      return null;
    }
    return this.markRepository.getById(mark.id);
  }

  async deleteById(formData: FormData) {
    const data = {
      id: Number(formData.get('id')) ?? -1,
    };
    try {
      await this.markRepository.deleteBy(data.id);
      return { status: '200' };
    } catch (err) {
      return {
        error: 'Falla al borrar marca',
        status: '500',
      };
    }
  }
}
