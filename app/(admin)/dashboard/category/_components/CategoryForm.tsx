'use client';

import { useState } from 'react';
import { SubmitEvent } from '@/app/lib/definitions';
import { Field } from '@/app/ui/form/Field';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';
import { createCategoryAction } from '../create/action';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import { updateCategoryAction } from './action';
import { useRouter } from 'next/navigation';
import { DASHBOARD_PATH } from '@/app/lib/paths';

export function CategoryForm({
  id,
  name = '',
}: {
  id?: number;
  name?: string;
}) {
  const [state, setState] = useState<string>(name);
  const router = useRouter();

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    let res: { status: number; error?: string } | null = null;

    if (!id) {
      res = await createCategoryAction(state);
    } else {
      res = await updateCategoryAction({ name: state, id });
    }

    if (res.status === 200) {
      toastSuccess(
        id
          ? 'Se ha actualizado correctamente.'
          : 'La categoria se creo exitosamente.',
      );
      setState('');
      router.push(DASHBOARD_PATH.CATEGORY);
    }
    if (res.status === 500) {
      if (res.error) toastErr(res.error);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        className="p-6 shadow-lg flex flex-col align-center bg-secondary-light rounded-md"
        onSubmit={onSubmit}
      >
        {id && (
          <div className="grid justify-center align-center">
            <h2 className="text-center text-2xl font-extrabold">ID: {id}</h2>
          </div>
        )}
        <Field label="Nombre" id="name">
          <input
            id="name"
            type="text"
            name="name"
            className="flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Lapiz Faber-Castell HB negro"
            minLength={2}
            required
          />
        </Field>
        <SubmitBtn text={id ? 'Actualizar' : 'Crear'} />
      </form>
    </div>
  );
}
