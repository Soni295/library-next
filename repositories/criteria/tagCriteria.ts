import type prisma from '@/app/lib/db/prisma';

type formatTag = Parameters<typeof prisma.tag.findMany>;

export interface Filter<T> {
  get(): T;
}
type FilterTag = Filter<formatTag>;

export class CriteriaTag {
  constructor(
    readonly filters: Filter<formatTag>[],
    readonly page: number = 1,
    readonly pageSize: number = 20, // pageSize
  ) {}
  apply(): formatTag {
    let query = {
      where: {},
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
      include: {},
    };
    this.filters.forEach((f) => {
      const tempQuery = f.get()[0];
      Object.assign(query.where, f.get()[0]?.where);
      if (tempQuery?.include) {
        Object.assign(query.include, tempQuery.include);
      }
    });
    return [query];
  }
}

export class FilterByNotDeleted implements FilterTag {
  get(): formatTag {
    return [
      {
        where: { deletedAt: null },
      },
    ];
  }
}

export class FilterByName implements FilterTag {
  constructor(readonly name: string) {}
  get(): formatTag {
    return [
      {
        where: {
          name: { contains: this.name },
        },
      },
    ];
  }
}
