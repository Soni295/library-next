import { categoryCtrl } from '@/app/lib/compose/inversify';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { stringToNumber } from '@/app/lib/utils/convert';
import { NotFound } from '@/app/ui/notFound';
import { CategoryForm } from '../_components/CategoryForm';

interface CategoryIdPageProps {
  params: { categoryId: string };
}

export default async function CategoryIdPage({
  params: { categoryId },
}: CategoryIdPageProps) {
  const id = stringToNumber(categoryId);
  const data = await categoryCtrl.getById(id);

  if (!data) {
    return (
      <NotFound
        msg={`categoria (${categoryId}) no encontrada`}
        href={DASHBOARD_PATH.CATEGORY}
      />
    );
  }

  return <CategoryForm id={id} name={data.name} />;
}
