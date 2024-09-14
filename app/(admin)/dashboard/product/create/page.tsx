'use client';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { SERVER_PATH } from '@/app/lib/paths';
import { Question } from '@/app/ui/question';
import { MarksForSelect } from '@/repositories/markRepository';
import { SubmitEvent } from '@/app/lib/definitions';
import { createProductAction } from './action';
import { useImg } from '@/app/lib/customHooks/useImage';
import { ImagenButton, ImagenView } from '@/app/ui/dashboard/ImageForm';
import { toastErr, toastSuccess } from '@/app/ui/toast';

export default function ProductCreatePage() {
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <CreateProductForm />
    </div>
  );
}
type ChangeEv = ChangeEvent<HTMLSelectElement | HTMLInputElement>;

export function CreateProductForm() {
  const [img, setImg, reset] = useImg();

  const [state, setState] = useState({
    name: '',
    basePrice: undefined,
    description: '',
    quantity: 0,
    minQuantity: 0,
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

  const handleChange = (e: ChangeEv) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.set('name', state.name.trim());
    form.set('basePrice', String(state.basePrice));
    form.set('description', state.description.trim());
    form.set('code', state.code.trim());
    form.set('mark', state.mark);
    form.set('enable', state.enable);
    form.set('quantity', String(state.quantity));
    form.set('minQuantity', String(state.minQuantity));

    if (img.file) {
      form.append('photo', img.file);
    }

    const res = await createProductAction(form);

    if (res.status === '200') {
      toastSuccess('La marca se creo exitosamente.');
      return;
    }
    if (res.status === '500') {
      if (res.error) toastErr(res.error);
    }
  };

  return (
    <form
      className="  p-6 shadow-lg bg-secondary-light rounded-md"
      onSubmit={onSubmit}
    >
      <div className="grid gap-x-5 grid-cols-3">
        <div>
          <ImagenView src={img.link} alt="hola" />
          <ImagenButton
            msg="Selecione foto del producto"
            handleImageChange={setImg}
          />
          <div className="flex gap-x-1.5 items-center">
            <label className="flex-none" htmlFor="name">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              className=" flex-1 my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
              value={state.name}
              onChange={handleChange}
              name="name"
              placeholder="Lapiz Faber-Castell HB negro"
              minLength={2}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col text-sm gap-y-1.5">
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
          </div>
          <div className="flex flex-col my-[1rem] gap-y-1.5">
            <div className="flex text-sm ">
              <label htmlFor="mark">Estado:</label>
              <Question
                className="mx-[0.25rem] h-[1.2em] w-[1.2em] text-xs"
                msg="En caso de estar desactivado el articulo no le apareca a los clientes."
              />
            </div>
            <select
              className="flex-grow text-sm pl-[0.25rem] h-[2rem] rounded-md"
              onChange={handleChange}
              value={state.enable}
              name="enable"
            >
              <option value={0}>No Activo</option>
              <option value={1}>Activo</option>
            </select>
          </div>

          <div className="flex flex-col my-[1rem] text-sm gap-y-1.5">
            <label className="text-sm mr-[0.25rem]" htmlFor="price">
              Precio Base:
            </label>
            <input
              id="price"
              name="basePrice"
              step="0.01"
              type="number"
              className="h-[2rem] rounded-lg pl-[0.25rem] flex-grow"
              value={state.basePrice}
              onChange={handleChange}
              placeholder="20.20"
              min="1"
              required
            />
          </div>
          <div className="flex flex-col my-[1rem] gap-y-1.5">
            <label className="flex" htmlFor="description">
              Descripcion <span className="text-slate-700"> (opcional)</span>:
              <Question
                className="mx-[0.25rem] h-[1.2em] w-[1.2em] text-xs"
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
          </div>
        </div>

        <div>
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
          <label htmlFor="quantity">
            Stock disponibles(opcional)
            <Question
              className="ml-[1rem]"
              msg="Es la cantidad de elementos en disponibles, este numero es 0 no habra productos visibles para los clientes"
            />
          </label>
          <input
            id="quantity"
            type="number"
            className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
            value={state.quantity}
            onChange={handleChange}
            name="quantity"
            placeholder="100"
          />

          <label htmlFor="minQuantity">
            Stock Minimo (opcional)
            <Question
              className="ml-[1rem]"
              msg="Es la cantidad minima de elementos antes de pasar el producto a la lista de a ordenar"
            />
          </label>
          <input
            id="minQuantity"
            type="number"
            className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
            value={state.minQuantity}
            onChange={handleChange}
            name="minQuantity"
            placeholder="1"
          />
        </div>
      </div>
      <input
        className="bg-blue-400 m-auto mt-[2rem] px-8 py-2 rounded-xl cursor-pointer"
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
