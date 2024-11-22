import { ProductPrisma } from '@/app/lib/db/prisma';
import { Maybe } from '@/app/lib/definitions/general';

export type MaybeProduct = Maybe<ProductPrisma>;
export type MaybeProducts = Maybe<ProductPrisma[]>;
export type ProductId = Pick<ProductPrisma, 'id'>;
