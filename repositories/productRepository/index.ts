import { injectable } from 'inversify';
import prisma, { MarkPrisma } from '@/app/lib/db/prisma';
import {
  ProductCreateInput,
  ProductUpdateInput,
} from '@/app/lib/definitions/product';
import { ProductPrisma } from '@/app/lib/db/prisma';
import { PageSearchFilter, ProductPage, SearchFilterProductStock } from '..';
import { Maybe } from '@/app/lib/definitions/general';
import { TagIcon } from '@/app/ui/dashboard/SideBar/icons';

export type MaybeProduct = Maybe<ProductPrisma>;
export type MaybeProducts = Maybe<ProductPrisma[]>;
export type ProductId = Pick<ProductPrisma, 'id'>;

@injectable()
export class ProductRepository {
  async save(product: ProductCreateInput): Promise<MaybeProduct> {
    const mark = product.markId
      ? { mark: { connect: { id: product.markId } } }
      : {};
    return await prisma.product.create({
      data: {
        name: product.name,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        description: product.description,
        code: product.code,
        basePrice: product.basePrice,
        enable: product.enable,
        photo: product.photo,
        ...mark,
        productTag: {
          create: product.tagIds.map((t) => ({ tag: { connect: { id: t } } })),
        },
      },
    });
  }

  async addTag(info: {
    productId: number;
    tagId: number;
  }): Promise<MaybeProduct> {
    return await prisma.product.update({
      where: { id: info.productId },
      data: {
        productTag: { create: [{ tagId: info.tagId }] },
        updateAt: new Date(),
      },
    });
  }

  async removeTag({
    tagId,
    productId,
  }: {
    productId: number;
    tagId: number;
  }): Promise<void> {
    console.log({ productId, tagId });
    await prisma.productTag.deleteMany({
      where: { tagId, productId },
    });
  }

  async update(product: ProductUpdateInput): Promise<MaybeProduct> {
    const mark = product.markId
      ? { mark: { connect: { id: product.markId } } }
      : {};

    return await prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        description: product.description,
        code: product.code,
        basePrice: product.basePrice,
        enable: product.enable,
        photo: product.photo,
        updateAt: new Date(),
        ...mark,
      },
    });
  }

  async getManyById(pIds: ProductId[]): Promise<MaybeProducts> {
    const ids = pIds.map((p) => p.id);
    return prisma.product.findMany({ where: { id: { in: ids } } });
  }

  async getById({ id }: ProductId) {
    return await prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: { productTag: { include: { tag: true } } },
    });
  }

  async getAll(): Promise<MaybeProducts> {
    return await prisma.product.findMany({ where: { deletedAt: null } });
  }

  async getTagsProductsByFilter({ text = '' }: SearchFilterProductStock) {
    const info = await prisma.category.findMany({
      where: {
        tags: {
          some: {
            productTag: { some: { product: { name: { contains: text } } } },
          },
        },
      },
    });
    console.log(info);
  }

  async getProductsByFilter({
    page = 1,
    pageSize = 20,
    text = '',
  }: SearchFilterProductStock): Promise<ProductPage> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = {
      OR: [{ name: { contains: text } }],
    };

    const data = await prisma.product.findMany({
      where,
      skip,
      take,
      include: { mark: true },
    });

    const totalItems = await prisma.product.count({ where });
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
