'use client';

import { ChangeEvent, useState } from 'react';
import { SubmitEvent } from '@/app/lib/definitions';
import { Field } from '@/app/ui/form/Field';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';
import { toastErr } from '@/app/ui/toast';
import { Form } from '@/app/ui/form/Form';

export function TagForm({ categories = [], tag }: TagFormProps) {
  const initial = {
    name: tag ? tag.name : '',
    categoryId: tag
      ? String(tag.categoryId)
      : categories[0]
        ? categories[0]?.id
        : '',
  };

  const [state, setState] = useState(initial);

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (state.categoryId == '') {
      toastErr('Se debe crear una categoria primero');
    }

    console.log(state);
  };

  const fieldStyle = 'flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm';

  const handleChange = async (e: ChangeEv) => {
    console.log(e.target.name, e.target.value);
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
