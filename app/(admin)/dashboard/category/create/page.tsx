'use client';

import { ChangeEvent, useState } from 'react';
import { SubmitEvent } from '@/app/lib/definitions';
import { Field } from '@/app/ui/form/Field';
import { createCategoryAction } from './action';
import { toastErr, toastSuccess } from '@/app/ui/toast';

type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;

export default function CreateCategoryPage() {
  const [state, setState] = useState('');

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await createCategoryAction(state);

    if (res.status === 200) {
      toastSuccess('La categoria se creo exitosamente.');
      setState('');
      return;
    }
    if (res.status === 200) {
      toastSuccess('La categoria se creo exitosamente.');
      setState('');
      return;
    }
    if (res.status === 500) {
      if (res.error) toastErr(res.error);
    }
  };

  const handleChange = (e: ChangeEv) => setState(e.target.value);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        className="w-[28rem] flex flex-col p-6 shadow-lg bg-secondary-light rounded-md"
        onSubmit={onSubmit}
      >
        <Field label="Categoria" id="name">
          <input
            id="name"
            type="text"
            name="name"
            className="flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm"
            value={state}
            onChange={handleChange}
            placeholder="Color"
            minLength={2}
            required
          />
        </Field>
        <input
          className="bg-blue-400 text-center m-auto mt-4 px-8 py-2 rounded-xl cursor-pointer"
          type="submit"
          value="Crear"
        />
      </form>
    </div>
  );
}
