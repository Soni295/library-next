'use server';
import 'server-only';
import { productCtrl } from '@/app/lib/compose/inversify';

export async function createProductAction(formData: FormData) {
  return await productCtrl.save(formData);
}
