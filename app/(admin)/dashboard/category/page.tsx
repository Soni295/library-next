'use client';

import { CategoryTable } from '@/app/ui/tables/categoryTable';
import { useState, FormEvent } from 'react';
//import CategoryProvider, { categoryContext } from '@/context/categoryContext';

function InputCategory() {
  const [categoryName, setCategoryName] = useState<string>('');
  //const { createCategory } = categoryContext();
  /*
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			createCategory(categoryName);
			setCategoryName('');
			alert('se ha creado una nueva categoria');
		} catch (err) {
			alert('error');
		}
	};
  */
  return (
    <form className="mx-auto my-5 ">
      <input
        type="text"
        placeholder="Nueva Categoria"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <input type="submit" value="Crear" />
    </form>
  );
}

export default function Page() {
  //<InputCategory />
  //<CategoryTable />
  return (
    <div className="p-4 sm:ml-64">
      <main className="container mt-5 mx-auto px-4 sm:px-8">
        <h2 className="text-2xl font-semibold leading-tight">Categorias</h2>
      </main>
    </div>
  );
}
