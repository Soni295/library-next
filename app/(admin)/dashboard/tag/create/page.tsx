import { categoryCtrl } from '@/app/lib/compose/inversify';
import { TagForm } from './TagForm';

export default async function TagCreatePage() {
  const categories = await categoryCtrl.getAll();
  return <TagForm categories={categories} />;
}
