'use server';
import 'server-only';
import { tagCtrl } from '@/app/lib/compose/inversify';

export async function createTagAction(formData: FormData) {
  try {
    await tagCtrl.save(formData);
    return { status: 200 };
  } catch (err) {
    console.log(err);
    return { status: 500, error: 'hubo un error al crear la etiqueta' };
  }
}

export async function updateTagAction(formData: FormData) {
  try {
    await tagCtrl.update(formData);
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: 'hubo un error al actualizar la etiqueta' };
  }
}

export async function deleteTagAction(id: number) {
  try {
    await tagCtrl.deleteById(id);
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: 'hubo un error al borrar la etiqueta' };
  }
}
