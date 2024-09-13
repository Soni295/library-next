import { DASHBOARD_PATH } from '@/app/lib/paths';
import { MarkRepository } from '@/repositories/markRepository';
import { NotFound } from '@/app/ui/notFound';

interface MakePageProps {
  params: { markId: string };
}

export function stringToNumber(str: string) {
  const a = parseInt(str, 10);
  return isNaN(a) ? -1 : a;
}

export default async function Page({ params: { markId } }: MakePageProps) {
  const id = stringToNumber(markId);
  const data = await MarkRepository.getById(id);
  if (data == null)
    return (
      <NotFound
        msg={`Marca(${markId}) no encontrada`}
        href={DASHBOARD_PATH.MARK}
      />
    );

  console.log(data);
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        className="w-[28rem] p-6 shadow-lg bg-secondary-light rounded-md"
        onSubmit={onSubmit}
      >
        <ImagenView src={img.link} alt="hola" />
        <ImagenButton msg="Selecione Icono" handleImageChange={setImg} />

        <input
          type="text"
          className="my-[1rem] w-full h-[2rem] rounded-lg pl-[0.5rem]"
          minLength={2}
          value={formInfo.name}
          onChange={handleChange}
          name="name"
          placeholder="Eq"
          required
        />

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
          <Question
            className="ml-[1rem]"
            msg="En caso de no estar activa la marca no aparecera ningun producto relacionada con ella, ni esta como sugerencia"
          />
        </div>
        <input
          className="bg-blue-400 m-auto px-8 py-2 rounded-xl cursor-pointer"
          type="submit"
          value="Crear"
        />
      </form>
    </div>
  );
}
