import { inject, injectable } from 'inversify';
import { TypesCompose } from '@/app/lib/compose';
import { MarkCreateSchema } from '@/app/lib/definitions/mark';
import { handlerImgMark } from '@/app/lib/utils/handleImage';
import {
  type MarkRepository,
  PageSearchBasic,
} from '@/repositories/markRepository';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { GeneralController } from './mainController';
import { Mark } from '@prisma/client';
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

  async save(formData: FormData) {
    if (!(await this.userPermissionVerifier.isAdmin())) {
      return { error: 'no autorizado', status: '500' };
    }

    const file = formData.get('icon') as File;
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
        console.log('alto error PrismaClientValidationError', err.message);
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
}
