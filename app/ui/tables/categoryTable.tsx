import { Category } from '@/app/lib/definitions/models/category';
import { useState } from 'react';
import { categoryContext } from '@/context/categoryContext';
import { Props } from '../../lib/definitions';

export function CategoryTable() {
  const { categories } = categoryContext();

  return (
    <table className="">
      <THead headers={['Id', 'Nombre', 'Action']} />
      <tbody>
        {categories.map((category) => (
          <CategoryField key={'category' + category.id} category={category} />
        ))}
      </tbody>
    </table>
  );
}

export function Th({ children }: Props) {
  return <th className="p-[1rem] text-left">{children}</th>;
}

export function THead({ headers }: { headers: string[] }) {
  const thStyle =
    'p-[2rem] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider';

  return (
    <thead className="min-w-full leading-normal">
      <tr className="p-[2rem]">
        {headers.map((header, index) => (
          <th key={header + String(index)} className={thStyle}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function CategoryField({ category }: { category: Category }) {
  const { updateCategory, deleteCategory } = categoryContext();
  const [name, setName] = useState(category.name);

  const onBlur = () => {
    if (category.name === name) return;
    updateCategory({ ...category, name }).then((_) => {
      alert('categoria actualizada');
    });
  };

  const onDelete = () => deleteCategory({ id: category.id });

  return (
    <tr>
      <td className="p-[2rem] border border-slate-600">{category.id}</td>
      <td className="p-[2rem] border border-slate-600">
        <input
          className="shadow-md"
          type="text"
          value={name}
          onBlur={onBlur}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="px-5 py-3 border border-slate-600">
        <button onClick={onDelete}>Borrar</button>
      </td>
    </tr>
  );
}
