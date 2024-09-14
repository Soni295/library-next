'use server';
import 'server-only';
import { markCtrl } from '@/app/lib/compose/inversify';

export async function createMarkAction(formData: FormData) {
  return markCtrl.save(formData);
}
