'use client';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { SERVER_PATH } from '@/app/lib/paths';
import { Question } from '@/app/ui/question';
import { MarksForSelect } from '@/repositories/markRepository';

export function CreateProductForm() {
  const [state, setState] = useState({
    name: '',
    basePrice: 0,
    description: '',
    code: '',
    mark: '1',
    enable: '0',
  });
  const [marks, setMarks] = useState<MarksForSelect>([]);

  useEffect(() => {
    async function a() {
      const data = await axios.get<MarksForSelect>(SERVER_PATH.MARKAll);
      setMarks(data.data);
    }
    a();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: SubmitEvent) => {};

  return (
    <form
      className="grid w-[28rem] p-6 shadow-lg bg-secondary-light rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(state);
      }}
    >
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        type="text"
        className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
        value={state.name}
        onChange={handleChange}
        name="name"
        placeholder="Lapiz Faber-Castell HB negro"
        minLength={2}
        required
      />

      <label htmlFor="code">
        Codigo(opcional):
        <Question
          className="ml-[1rem]"
          msg="Es un codigo interno por si se quiere buscar mas rapido"
        />
      </label>
      <input
        id="code"
        type="text"
        className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
        value={state.code}
        onChange={handleChange}
        name="code"
        placeholder="Lap-01"
      />

      <label htmlFor="mark">Marca:</label>
      <select
        id="mark"
        className="flex-grow pl-[0.25rem] h-[2rem] rounded-md"
        value={state.mark}
        onChange={handleChange}
        name="mark"
      >
        {marks.map((mark) => (
          <option key={`${mark.name}-${mark.id}`} value={mark.id}>
            {mark.name}
          </option>
        ))}
      </select>

      <div className="flex items-center  my-[1rem] w-full">
        <label htmlFor="mark">Estado:</label>
        <select
          className="flex-grow pl-[0.25rem] h-[2rem] rounded-md"
          onChange={handleChange}
          value={state.enable}
          name="enable"
        >
          <option value={0}>No Activo</option>
          <option value={1}>Activo</option>
        </select>
        <Question
          className="ml-[1rem]"
          msg="En caso de estar desactivado el articulo no le apareca a los clientes."
        />
      </div>

      <label htmlFor="price">Precio Base:</label>
      <input
        id="price"
        name="basePrice"
        type="number"
        className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
        value={state.basePrice}
        onChange={handleChange}
        placeholder="20.20"
        min="1"
        required
      />

      <label className="flex" htmlFor="description">
        Descripcion(opcional):
        <Question
          className="ml-[1rem]"
          msg="Es una breve descripcion para que el cliente pueda saber un poco mas acerca del producto."
        />
      </label>
      <input
        id="description"
        type="text"
        className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
        value={state.description}
        onChange={handleChange}
        name="description"
        placeholder="Es un lapiz semi duro"
      />

      <input
        className="bg-blue-400 m-auto px-8 py-2 rounded-xl cursor-pointer"
        type="submit"
        value="Crear"
      />
    </form>
  );
}
/*
  name        String           @db.VarChar(255)
  description String?          @db.MediumText
  code        String?          @db.VarChar(255)
  //photos      Json?            @db.Json
  // photos      String[]            @db.MediumText
  basePrice   Decimal          @db.Decimal(7, 2)
  //prices      Price[] // Relación con precios
  //priceRules  PriceRules[]
  markId      Int?
  mark        Mark?            @relation(fields: [markId], references: [id])
  // categoryId  Int?
  // category    Category?        @relation(fields: [categoryId], references: [id])
  // variants    ProductVariant[] // Relación con variantes de producto
  order       ProductOnOrder[]

  createdAt DateTime  @default(now())
  updateAt  DateTime  @default(now())
  deletedAt DateTime?
*/
