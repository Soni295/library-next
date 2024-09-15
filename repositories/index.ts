import { MarkPrisma, ProductPrisma } from '@/app/lib/db/prisma';

export interface Page<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type MarkPage = Page<MarkPrisma>;
export type ProductPage = Page<ProductPrisma & { mark: MarkPrisma | null }>;

export interface PageSearchBasic {
  page: number;
  pageSize?: number;
}

export interface SearchFilterProductStock extends PageSearchBasic {
  text?: string;
}

export interface PageSearchFilter extends PageSearchBasic {}
