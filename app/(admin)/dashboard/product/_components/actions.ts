'use server';
import 'server-only';
import { productCtrl } from '@/app/lib/compose/inversify';
import { requirePermission } from '@/app/lib/auth/auth-server';

export async function addTagAction(info: { productId: number; tagId: number }) {
  return await productCtrl.addTag(info);
}

export async function removeTagAction(info: {
  productId: number;
  tagId: number;
}) {
  return await productCtrl.removeTag(info);
}

export async function createProductAction(formData: FormData) {
  try {
    await requirePermission('create_product');
    const data = await productCtrl.save(formData);
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return { status: '500', error: err.message };
    }
    return { status: '500', error: 'Error no definido.' };
  }

  return { status: '200' };
}

export async function updateProductAction(formData: FormData) {
  return await productCtrl.update(formData);
}
