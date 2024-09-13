import prisma from '@/app/lib/db/prisma';

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
