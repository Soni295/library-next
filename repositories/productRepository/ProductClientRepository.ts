import { injectable } from 'inversify';
import { ProductId } from './interface';
import prisma from '@/app/lib/db/prisma';

@injectable()
export class ProductClientRepository {
  async getById({ id }: ProductId) {
    return await prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: { productTag: { include: { tag: true } } },
    });
  }
}
