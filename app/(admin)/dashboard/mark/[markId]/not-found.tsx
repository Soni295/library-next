import { DASHBOARD_PATH } from '@/app/lib/paths';
import { NotFound } from '@/app/ui/notFound';

export default function NotFoundMark({ id = '' }: Props) {
  let msg = 'Marca';
  if (id) msg += `(${id})`;
  msg += ' no encontrada';

  return <NotFound href={DASHBOARD_PATH.MARK} msg={msg} />;
}

interface Props {
  id: string;
}
