import {
  Category,
  CategoryUpdate,
  CategoryId,
} from '@/app/lib/definitions/models/category';
import { ENDPOINTS } from '../config';

interface ResCategories {
  data: { categories: Category[] };
}

interface ResCategory {
  data: { category: Category };
}

const headers = { 'Content-Type': 'application/json' };

export const categoryService = {
  async getAll(): Promise<ResCategories> {
    const data = await fetch(ENDPOINTS.CATEGORY);
    return await data.json();
  },

  async save(body: { name: string }): Promise<ResCategory> {
    const data = await fetch(ENDPOINTS.CATEGORY, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    return await data.json();
  },

  async updateCategory(category: CategoryUpdate): Promise<ResCategory> {
    const data = await fetch(ENDPOINTS.CATEGORY, {
      method: 'PUT',
      headers,
      body: JSON.stringify(category),
    });
    return await data.json();
  },

  async deleteCategory(category: CategoryId): Promise<ResCategories> {
    const data = await fetch(ENDPOINTS.CATEGORY, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(category),
    });
    return await data.json();
  },
};
