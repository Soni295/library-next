'use server';
import 'server-only';
import { markCtrl } from '@/app/lib/compose/inversify';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/lib/auth/auth';
import { getServerSession } from 'next-auth';
import { can } from '@/app/lib/can';

async function hasAccess(permission: string) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) throw new Error('Unauthorized');
  if (!can(session.user, permission)) throw new Error('Unauthorized');
}

export async function createMarkAction(formData: FormData) {
  hasAccess('create_mark');
  return markCtrl.save(formData);
}

export async function updateMarkAction(formData: FormData) {
  hasAccess('edit_mark');

  const result = await markCtrl.update(formData);
  revalidatePath('/dashboard/mark/[markId]', 'page');
  return result;
}

export async function deleteMarkAction(formData: FormData) {
  hasAccess('delete_mark');
  return await markCtrl.deleteById(formData);
}
