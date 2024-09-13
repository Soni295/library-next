export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date | null;
}

export interface CategoryUpdate extends Pick<Category, 'id' | 'name'> {}
export interface CategoryId extends Pick<Category, 'id'> {}
