'use server';
import 'server-only';

import { categoryCtrl } from '@/app/lib/compose/inversify';

export async function createCategoryAction(name: string) {
  try {
    await categoryCtrl.save({ name });
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: 'hubo un error al crear la categoria' };
  }
}
