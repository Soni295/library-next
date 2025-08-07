'use server';
import 'server-only';
import { markCtrl } from '@/app/lib/compose/inversify';

export async function createMarkAction(formData: FormData) {
  return markCtrl.save(formData);
}

export async function updateMarkAction(formData: FormData) {
  return markCtrl.update(formData);
}
