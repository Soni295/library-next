import { DASHBOARD_PATH } from '@/app/lib/paths';
import { NotFound } from '@/app/ui/notFound';

export function CategoryTableEmpty() {
  return (
    <NotFound
      msgLink="por favor cree una categoria"
      msg="No hay categorias disponibles"
      href={DASHBOARD_PATH.CATEGORY_CREATE}
    />
  );
}
