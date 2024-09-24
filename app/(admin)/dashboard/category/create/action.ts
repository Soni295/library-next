'use server';
import { categoryCtrl } from '@/app/lib/compose/inversify';
import 'server-only';

export async function createCategoryAction(name: string) {
  try {
    const catergory = await categoryCtrl.save({ name });
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: 'hubo un error al crear la categoria' };
  }
}
