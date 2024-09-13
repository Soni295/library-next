import type prisma from '@/lib/prisma';

type formatProduct = Parameters<typeof prisma.product.findMany>;

export interface Filter {
  get(): formatProduct;
}

export class FilterEnable implements Filter {
  constructor(readonly name: string) {}

  get(): formatProduct {
    return [
      {
        where: {
          deletedAt: null,
          photos: { not: [] },
        },
      },
    ];
  }
}

export class FilterByName implements Filter {
  constructor(readonly name: string) {}

  get(): formatProduct {
    return [{ where: { name: this.name } }];
  }
}

export class FilterByPrice implements Filter {
  constructor(readonly name: string) {}

  get(): formatProduct {
    return [{ where: { name: this.name } }];
  }
}
