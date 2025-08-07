'use client';

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { SubmitEvent } from '@/app/lib/definitions';
import { useImg } from '@/app/lib/customHooks/useImage';
import { ImagenButton, ImagenView } from '@/app/ui/dashboard/ImageForm';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import {
  addTagAction,
  createProductAction,
  removeTagAction,
  updateProductAction,
} from './actions';
import { Field } from '@/app/ui/form/Field';
import { SubmitBtn } from '@/app/ui/input/SubmitBtn';
import { tagService } from '@/app/lib/fetch/api/tag';
import { useAutoComplete } from '@/app/ui/useAutoComplete';
import { IproductInfo, useAllMarks, useProductInfo } from './customhooks';
import { InputTagSearch } from './InputTagSearch';

export function ProductForm({ productInfo, imgInfo }: ProductFormProps) {
  const [state, handleChange, addTag, removeTag] = useProductInfo(productInfo);
  const autoComplete = useAutoComplete<{
    id: number;
    name: string;
    createdAt: string;
  }>({
    async onChange(element) {
      if (!productInfo?.id) {
        addTag({ id: element.id, name: element.name });
        return;
      }
      const data = { productId: productInfo.id, tagId: element.id };
      const res = await addTagAction(data);
      if (res.status === '200') {
        toastSuccess('La etiqueta se agrego exitosamente.');
        addTag({ id: element.id, name: element.name });
      }
      if (res.status === '500') if (res.error) toastErr(res.error);
    },
    async source(search) {
      const tags = await tagService.findByName(search);

      // filtrar los que no van de los que ya vienen por defecto
      return tags.filter((t) => !state.tags.some((st) => st.id == t.id));
    },
  });

  const [img, setImg] = useImg(imgInfo);
  const [marks] = useAllMarks();

  const deleteTag = async (tagId: number, productId?: number) => {
    if (productId) {
      const res = await removeTagAction({
        tagId,
        productId: productId as number,
      });

      if (res.status === '500') {
        if (res.error) toastErr(res.error);
        return;
      }
    }

    removeTag(tagId);
    toastSuccess('La etiqueta se actualizo exitosamente.');
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

    if (!productInfo?.id) {
      form.set('tagIds', JSON.stringify(state.tags));
      const res = await createProductAction(form);
      if (res.status === '200')
        toastSuccess('El producto se creo exitosamente.');
      if (res.status === '500' && res.error) toastErr(res.error);
      return;
    }
    form.set('id', String(productInfo.id));

    const res = await updateProductAction(form);
    if (res.status === '200')
      toastSuccess('El producto se actualizo exitosamente.');
    if (res.status === '500') if (res.error) toastErr(res.error);
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

  return (
    <form
      className="p-6 shadow-lg flex flex-col align-center bg-secondary-light rounded-md"
      onSubmit={onSubmit}
    >
      <div className="grid gap-x-5 grid-cols-3">
        <div className="grid justify-center align-center">
          {state.id && (
            <h2 className="text-center text-2xl font-extrabold">
              ID:{state.id}
            </h2>
          )}
          <ImagenView src={img.link} alt="Imagen" />
          <ImagenButton msg="Selecione foto" handleImageChange={setImg} />
        </div>

        <div>
          <Field label="Nombre" id="name">
            <Input
              id="name"
              type="text"
              name="name"
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
            <Input
              id="price"
              name="basePrice"
              step="0.01"
              type="number"
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
            <Input
              id="description"
              type="text"
              value={state.description}
              onChange={handleChange}
              name="description"
              placeholder="Es un lapiz semi duro"
            />
          </Field>

          <Field optional label="Codigo" id="code" question={questions.code}>
            <Input
              id="code"
              type="text"
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
            <Input
              id="quantity"
              type="number"
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
            <Input
              id="minQuantity"
              type="number"
              value={state.minQuantity}
              onChange={handleChange}
              name="minQuantity"
              placeholder="1"
            />
          </Field>
        </div>

        <div>
          <div>etiqueta</div>
          <InputTagSearch data={autoComplete} />
          <div className="flex flex-col gap-1 mt-[0.2rem] overscroll-none">
            {state.tags.map((tag) => (
              <div
                className="flex text-xs py-[0.05rem] px-[0.5rem] bg-blue-200"
                key={`tag-${tag.id}-${tag.name}`}
              >
                <p className="flex-1 truncate">{tag.name}</p>
                <span
                  onClick={() => {
                    deleteTag(tag.id, productInfo?.id);
                  }}
                  className="flex-none  text-slate-500  text-center text-bold hover:cursor-pointer hover:text-slate-900"
                >
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SubmitBtn text={productInfo?.id ? 'Actualizar' : 'Crear'} />
    </form>
  );
}

function Input(
  rest: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      {...rest}
      className="flex-1 py-[0.1em] rounded-lg pl-[0.5rem] text-sm"
    />
  );
}

interface ProductFormProps {
  productInfo?: IproductInfo;
  imgInfo?: string;
}
