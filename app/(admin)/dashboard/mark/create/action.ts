'use server';
import 'server-only';

import { markController } from '@/controllers';
import { userCtrl } from '@/app/lib/compose/inversify';

export async function createMarkAction(formData: FormData) {
  const isAdmin = await userCtrl.isAdmin();
  if (!isAdmin) return { error: 'no autorizado', status: '500' };
  return markController.save(formData);
}
