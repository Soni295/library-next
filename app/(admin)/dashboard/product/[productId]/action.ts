'use server';
import 'server-only';
import { productCtrl } from '@/app/lib/compose/inversify';

export async function createProductAction(formData: FormData) {
  return await productCtrl.save(formData);
}

export async function updateProductAction(formData: FormData) {
  console.log(formData);
  return null;
  //return await productCtrl.save(formData);
}
