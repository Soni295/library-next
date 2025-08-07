'use server';
import 'server-only';
import { markCtrl } from '@/app/lib/compose/inversify';
import { revalidatePath } from 'next/cache';

export async function createMarkAction(formData: FormData) {
  return markCtrl.save(formData);
}

export async function updateMarkAction(formData: FormData) {
  const result = await markCtrl.update(formData);
  revalidatePath('/dashboard/mark/[markId]', 'page');
  return result;
}

export async function deleteMarkAction(formData: FormData) {
  return await markCtrl.deleteById(formData);
}
