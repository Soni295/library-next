'use client';
import { useState, ChangeEvent } from 'react';
import { Question } from '@/app/ui/question';
import { useImg } from '@/app/lib/customHooks/useImage';
import { ImagenButton, ImagenView } from '@/app/ui/dashboard/ImageForm';
import { SubmitEvent } from '@/app/lib/definitions';
import { createMarkAction, deleteMarkAction, updateMarkAction } from './action';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import { useRouter } from 'next/navigation';
import { PATH } from '@/app/lib/paths';

interface MarkCreateFormProps {
  id?: number;
  link?: string;
  name?: string;
  enable?: string;
}
function useMarkForm({
  link = '',
  name = '',
  enable = '1',
}: MarkCreateFormProps) {
  const [img, setImg, reset] = useImg(link);
  const [formInfo, setFormInfo] = useState({ name: name, enable: enable });

  const resetForm = () => {
    setFormInfo({ name: '', enable: '1' });
    reset();
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return { img, setImg, formInfo, handleChange, resetForm };
}

export function MarkCreateForm({
  id,
  link = '',
  name = '',
  enable = '1',
}: MarkCreateFormProps) {
  const { resetForm, img, setImg, formInfo, handleChange } = useMarkForm({
    link,
    name,
    enable,
  });
  const router = useRouter();

  async function onDelete() {
    const formData = new FormData();
    formData.set('id', String(id as number));
    const res = await deleteMarkAction(formData);

    if (res.status === '200') {
      toastSuccess('La marca se creo exitosamente.');
      router.push(PATH.DASHBOARD.MARK);
      return;
    }
    if (res.status === '500' && res.error) toastErr(res.error);
  }

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = new FormData();
    form.set('name', formInfo.name.trim());
    form.set('enable', String(formInfo.enable == '1'));

    if (img.file || img.link) {
      form.append('img.file', img.file ?? '');
      form.append('img.src', img.link);
    }
    if (!id) {
      const res = await createMarkAction(form);
      resetForm();
      if (res.status === '200') {
        toastSuccess('La marca se creo exitosamente.');
        router.push(PATH.DASHBOARD.MARK);
        return;
      }
      if (res.status === '500' && res.error) toastErr(res.error);

      return;
    }

    form.set('id', String(id));

    const res = await updateMarkAction(form);
    if (res?.status === '200') {
      toastSuccess('La marca se actualizo exitosamente.');
      router.push(PATH.DASHBOARD.MARK);
      return;
    }
    if (res?.status === '500' && res.error) toastErr(res.error);
  }

  return (
    <form
      className="w-[28rem] p-6 shadow-lg bg-secondary-light rounded-md"
      onSubmit={onSubmit}
    >
      <ImagenView src={img.link} alt="hola" />
      <ImagenButton msg="Selecione Icono" handleImageChange={setImg} />
      <div>
        <label htmlFor="name" className="text-sm">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          className="my-[0.5rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
          minLength={2}
          value={formInfo.name}
          onChange={handleChange}
          name="name"
          placeholder="Eq"
          required
        />
      </div>

      <div>
        <div className="flex">
          <label htmlFor="name" className="text-sm">
            Estado:
          </label>
          <Question
            className="mx-[0.25rem] h-[1.2em] w-[1.2em] text-xs"
            msg="En caso de no estar activa la marca no aparecera ningun producto relacionada con ella, ni esta como sugerencia"
          />
        </div>

        <div className="flex items-center flex-grow my-[1rem] w-full">
          <select
            className="flex-grow pl-[0.25rem] h-[2rem] rounded-md"
            value={formInfo.enable}
            onChange={handleChange}
            name="enable"
          >
            <option value={1}>Activo</option>
            <option value={0}>No Activo</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <input
          className="bg-blue-400 m-auto px-8 py-2 rounded-xl cursor-pointer"
          type="submit"
          value={id ? 'Actualizar' : 'Crear'}
        />
        {id && (
          <input
            className="bg-red-400 m-auto px-8 py-2 rounded-xl cursor-pointer"
            type="button"
            value="Elimiar"
            onClick={onDelete}
          />
        )}
      </div>
    </form>
  );
}
