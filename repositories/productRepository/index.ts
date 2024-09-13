import { injectable } from 'inversify';
import prisma from '@/app/lib/db/prisma';
import { ProductCreateInput } from '@/app/lib/definitions/product';
import { ProductPrisma } from '@/app/lib/db/prisma';
import { PageSearchFilter, ProductPage } from '..';
import { Maybe } from '@/app/lib/definitions/general';

export type MaybeProduct = Maybe<ProductPrisma>;
export type MaybeProducts = Maybe<ProductPrisma[]>;
export type ProductId = Pick<ProductPrisma, 'id'>;

@injectable()
export class ProductRepository {
  async save(product: ProductCreateInput): Promise<MaybeProduct> {
    return await prisma.product.create({
      data: {
        name: product.name,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        description: product.description,
        code: product.code,
        mark: { connect: { id: product.markId } },
        basePrice: product.basePrice,
        enable: product.enable,
        photo: product.photo,
      },
    });
  }

  async getManyById(pIds: ProductId[]): Promise<MaybeProducts> {
    const ids = pIds.map((p) => p.id);
    return prisma.product.findMany({ where: { id: { in: ids } } });
  }

  async getById({ id }: ProductId): Promise<MaybeProduct> {
    return await prisma.product.findUnique({ where: { id, deletedAt: null } });
  }

  async getAll(): Promise<MaybeProducts> {
    return await prisma.product.findMany({ where: { deletedAt: null } });
  }

  async getProductsByFilter({
    page,
    pageSize = 20,
  }: PageSearchFilter): Promise<ProductPage> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const data = await prisma.product.findMany({
      skip,
      take,
      include: { mark: true },
    });
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
