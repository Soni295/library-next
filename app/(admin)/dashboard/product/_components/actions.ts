'use server';
import 'server-only';
import { productCtrl } from '@/app/lib/compose/inversify';

export async function addTagAction(info: { productId: number; tagId: number }) {
  return await productCtrl.addTag(info);
}

export async function createProductAction(formData: FormData) {
  return await productCtrl.save(formData);
}

export async function updateProductAction(formData: FormData) {
  return await productCtrl.update(formData);
}
