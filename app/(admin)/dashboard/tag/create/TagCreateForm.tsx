'use client';

import { ChangeEvent, useState } from 'react';
import { SubmitEvent } from '@/app/lib/definitions';
import { Field } from '@/app/ui/form/Field';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';

interface Category {
  id: number;
  name: string;
}

interface TagCreateFormProps {
  categories: Category[];
}

type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;

export function TagCreateForm({ categories = [] }: TagCreateFormProps) {
  const [state, setState] = useState({ name: '', categoryId: '' });
  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const fieldStyle = 'flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm';

  const handleChange = (e: ChangeEv) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      className="w-[28rem] p-6 shadow-lg bg-secondary-light rounded-md"
      onSubmit={onSubmit}
    >
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

      <SubmitBtn text="Crear" />
    </form>
  );
}
