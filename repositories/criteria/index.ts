import type prisma from '@/app/lib/db/prisma';

type formatMark = Parameters<typeof prisma.mark.findMany>;

export interface Filter<T> {
  get(): T;
}

export type MarkFilter = Filter<formatMark>;

export class MarkFilterEnable implements MarkFilter {
  constructor(readonly name: string) {}

  get(): formatMark {
    return [
      {
        where: {
          deletedAt: null,
        },
      },
    ];
  }
}

interface Order {}

export class Criteria<T> {
  constructor(
    readonly filters: Filter<T>[],
    readonly limit: number = 10,
    readonly offset?: number,
  ) {}
  //page: number = 1, pageSize: number = 10
  apply() {
    const forma = '';
  }
}

/*
export class Criteria<T> {
  constructor(
    readonly filters: Filter<T>[],
    readonly limit: number = 10,
    readonly offset?: number,
  ) { }
  //page: number = 1, pageSize: number = 10
  abstract apply(): any;
}

*/

/*
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const marks = await prisma.mark.findMany({
      skip: skip,
      take: take,
    });

    const totalProducts = await prisma.mark.count();

    return {
      data: marks,
      page: page,
      pageSize: pageSize,
      totalProducts: totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
    };
*/
