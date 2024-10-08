'use client';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { SERVER_PATH } from '@/app/lib/paths';
import { MarksForSelect } from '@/repositories/markRepository';
import { SubmitEvent } from '@/app/lib/definitions';
import { createProductAction } from './action';
import { useImg } from '@/app/lib/customHooks/useImage';
import { ImagenButton, ImagenView } from '@/app/ui/dashboard/ImageForm';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';
import { Field } from '@/app/ui/form/Field';
import { Form } from '@/app/ui/form/Form';

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
    mark: 'No asignada',
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
    form.set('mark', String(state.mark));
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

  const questions = {
    enable:
      'En caso de estar desactivado el articulo no le apareca a los clientes.',
    basePrice:
      'El precio base es el precio del que se parte para luego aplicar las reglas.',
    description:
      'Es una breve descripcion para que el cliente pueda saber un poco mas acerca del producto.',
    code: 'Es un codigo interno por si se quiere buscar mas rapido, no lo conocen los clientes.',
    quantity:
      'Es la cantidad de elementos disponibles, si este numero es 0 no habra productos visibles para los clientes.',
    minQuantity:
      'Es la cantidad minima de elementos antes de pasar el producto a la lista de a ordenar.',
  };

  const fieldStyle = 'flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm';
  /*
    <form
      className="p-6 shadow-lg flex flex-col align-center bg-secondary-light rounded-md"
      onSubmit={onSubmit}
    >
	*/
  return (
    <Form onSubmit={onSubmit}>
      <div className="grid gap-x-5 grid-cols-3">
        <div className="justify-center">
          <ImagenView src={img.link} alt="hola" />
          <ImagenButton msg="Selecione foto" handleImageChange={setImg} />
        </div>

        <div>
          <Field label="Nombre" id="name">
            <input
              id="name"
              type="text"
              name="name"
              className={fieldStyle}
              value={state.name}
              onChange={handleChange}
              placeholder="Lapiz Faber-Castell HB negro"
              minLength={2}
              required
            />
          </Field>
          <Field label="Marca" id="mark">
            <select
              id="mark"
              className={fieldStyle}
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
          </Field>

          <Field label="Estado" id="enable" question={questions.enable}>
            <select
              id="enable"
              className={fieldStyle}
              onChange={handleChange}
              value={state.enable}
              name="enable"
            >
              <option value={0}>No Activo</option>
              <option value={1}>Activo</option>
            </select>
          </Field>

          <Field label="Precio Base" id="price" question={questions.basePrice}>
            <input
              id="price"
              name="basePrice"
              step="0.01"
              type="number"
              className={fieldStyle}
              value={state.basePrice}
              onChange={handleChange}
              placeholder="20.20"
              min="1"
              required
            />
          </Field>
        </div>

        <div>
          <Field
            optional
            label="Descripcion"
            id="description"
            question={questions.description}
          >
            <input
              id="description"
              type="text"
              className={fieldStyle}
              value={state.description}
              onChange={handleChange}
              name="description"
              placeholder="Es un lapiz semi duro"
            />
          </Field>

          <Field optional label="Codigo" id="code" question={questions.code}>
            <input
              id="code"
              type="text"
              className={fieldStyle}
              value={state.code}
              onChange={handleChange}
              name="code"
              placeholder="Lap-01"
            />
          </Field>

          <Field
            optional
            label="Stock disponible"
            id="quantity"
            question={questions.quantity}
          >
            <input
              id="quantity"
              type="number"
              className={fieldStyle}
              value={state.quantity}
              onChange={handleChange}
              name="quantity"
              placeholder="100"
            />
          </Field>

          <Field
            optional
            label="Stock minimo"
            id="minQuantity"
            question={questions.minQuantity}
          >
            <input
              id="minQuantity"
              type="number"
              className={fieldStyle}
              value={state.minQuantity}
              onChange={handleChange}
              name="minQuantity"
              placeholder="1"
            />
          </Field>
        </div>
      </div>
      <SubmitBtn text="Crear" />
    </Form>
  );
}
