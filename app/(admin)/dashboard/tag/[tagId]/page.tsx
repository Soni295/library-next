import { categoryCtrl, tagCtrl } from '@/app/lib/compose/inversify';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { stringToNumber } from '@/app/lib/utils/convert';
import { NotFound } from '@/app/ui/notFound';
import { TagForm } from '../components';

interface TagIdPageProps {
  params: { tagId: string };
}

export default async function CategoryIdPage({
  params: { tagId },
}: TagIdPageProps) {
  const id = stringToNumber(tagId);
  const data = await tagCtrl.getById(id);
  const categories = await categoryCtrl.getAll();

  if (!data) {
    return (
      <NotFound
        msg={`categoria (${tagId}) no encontrada`}
        href={DASHBOARD_PATH.TAGS}
      />
    );
  }

  return <TagForm tag={data} categories={categories} />;
}
