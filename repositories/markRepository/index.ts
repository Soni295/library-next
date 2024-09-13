import { injectable } from 'inversify';
import prisma, { MarkPrisma } from '@/app/lib/db/prisma';
import { Maybe } from '@/app/lib/definitions/general';
import { MarkCreate } from '@/app/lib/definitions/mark';

export interface Page<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type MarkPage = Page<MarkPrisma>;
export type MaybeMark = Maybe<MarkPrisma>;
export type MaybeMarks = Maybe<MarkPrisma[]>;
export type MarksForSelect = Pick<MarkPrisma, 'id' | 'name'>[] | [];

export interface PageSearchBasic {
  page: number;
  pageSize?: number;
}

@injectable()
export class MarkRepository {
  getAll(): Promise<MarksForSelect> {
    return prisma.mark.findMany({ select: { id: true, name: true } }) || [];
  }

  async create(mark: MarkCreate): Promise<MaybeMark> {
    return prisma.mark.create({ data: { ...mark } });
  }

  async getById(id: number): Promise<MaybeMark> {
    return prisma.mark.findUnique({ where: { id: id } });
  }

  async getByName(name: string): Promise<MaybeMarks> {
    return prisma.mark.findMany({
      where: {
        enable: true,
        name: {
          contains: `_${name}_`,
        },
      },
    });
  }

  static async update() {}

  //static async deleteById() { }
  async getMarkByPage({
    page,
    pageSize = 10,
  }: PageSearchBasic): Promise<MarkPage> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const data = await prisma.mark.findMany({ skip, take });

    const totalItems = await prisma.mark.count();
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
