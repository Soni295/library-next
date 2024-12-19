'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitEvent } from '@/app/lib/definitions';
import { Field } from '@/app/ui/form/Field';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import { Form } from '@/app/ui/form/Form';
import { createTagAction, deleteTagAction, updateTagAction } from '../actions';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { DeleteBtn } from '@/app/ui/input/DeleteBtn';

export function TagForm({ categories = [], tag }: TagFormProps) {
  const router = useRouter();
  const initial = {
    name: tag ? tag.name : '',
    categoryId: tag
      ? String(tag.categoryId)
      : categories[0]
        ? categories[0]?.id
        : '',
  };

  const [state, setState] = useState(initial);

  const onDelete = async () => {
    const res = await deleteTagAction(tag?.id as number);

    if (res.status === 200) {
      toastSuccess('Se ha borrado correctamenten');
      router.push(DASHBOARD_PATH.TAGS);
    }
    if (res.status === 500) {
      if (res.error) toastErr(res.error);
    }
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (state.categoryId == '') {
      toastErr('Se debe crear una categoria primero');
    }

    const formData = new FormData();
    formData.set('name', state.name);
    formData.set('categoryId', String(state.categoryId));

    let res: { status: number; error?: string } | null = null;

    if (tag) {
      formData.set('id', String(tag.id));
      res = await updateTagAction(formData);
    } else {
      res = await createTagAction(formData);
    }

    if (res.status === 200) {
      toastSuccess(
        tag
          ? 'Se ha actualizado correctamente.'
          : 'La categoria se creo exitosamente.',
      );
      router.push(DASHBOARD_PATH.TAGS);
    }
    if (res.status === 500) {
      if (res.error) toastErr(res.error);
    }
  };

  const fieldStyle = 'flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm';

  const handleChange = async (e: ChangeEv) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Form onSubmit={onSubmit} className="w-[28rem]">
      <Field label="Etiqueta" id="name">
        <input
          id="name"
          type="text"
          name="name"
          className={fieldStyle}
          value={state.name}
          onChange={handleChange}
          placeholder="Papelera"
          minLength={2}
          required
        />
      </Field>

      <Field label="Categoria" id="category">
        <select
          id="category"
          className={fieldStyle}
          value={state.categoryId}
          onChange={handleChange}
          name="categoryId"
        >
          {categories.map((cate) => (
            <option key={`${cate.name}-${cate.id}`} value={cate.id}>
              {cate.name}
            </option>
          ))}
        </select>
      </Field>

      <SubmitBtn text={tag?.id ? 'Actualizar' : 'Crear'} />
      {tag && <DeleteBtn text="eliminar" onClick={onDelete} />}
    </Form>
  );
}

interface Category {
  id: number;
  name: string;
}

interface TagFormProps {
  tag?: {
    id: number;
    name: string;
    categoryId: number;
  };
  categories: Category[];
}

type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;
