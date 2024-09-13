import { CLIENT_PATH } from './lib/paths';
import { NotFound } from './ui/notFound';

export default function NotFoundPage() {
  return (
    <NotFound
      href={CLIENT_PATH.HOME}
      msgLink="Volver a Home"
      msg="Pagina no encontrada"
    />
  );
}
