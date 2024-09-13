import { ENDPOINTS } from '../config';

const headers = { 'Content-Type': 'application/json' };

export const productService = {
  async getAll(): Promise<ResCategories> {
    const data = await fetch(ENDPOINTS.PRODUCT);
    return await data.json();
  },

  async save(body: { name: string }): Promise<void> {
    const data = await fetch(ENDPOINTS.PRODUCT, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    console.log(data);
    //return await data.json()
  },
  /*
  async updateCategory(category: CategoryUpdate): Promise<ResCategory> {
    console.log('hola')
    const data = await fetch(ENDPOINTS.CATEGORY, {
      method: "PUT",
      headers,
      body: JSON.stringify(category)
    })
    return await data.json()
  },

  async deleteCategory(category: CategoryId): Promise<ResCategories> {
    const data = await fetch(ENDPOINTS.CATEGORY, {
      method: "DELETE",
      headers,
      body: JSON.stringify(category)
    })
    return await data.json()
  }
  */
};
