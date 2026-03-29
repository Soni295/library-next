import { productCtrl } from '@/app/lib/compose/inversify';
import { DASHBOARD_PATH } from '@/app/lib/paths';
import { stringToNumber } from '@/app/lib/utils/convert';
import { NotFound } from '@/app/ui/notFound';
import { ProductForm } from '../_components/ProductForm';

interface ProductPageProps {
  params: { productId: string };
}

export default async function Page({
  params: { productId },
}: ProductPageProps) {
  const id = stringToNumber(productId);
  const data = await productCtrl.getById(id);

  if (!data) {
    return (
      <NotFound
        msg={`producto (${productId}) no encontrado`}
        href={DASHBOARD_PATH.PRODUCT}
      />
    );
  }
  return (
    <ProductForm
      imgInfo={data.photo}
      productInfo={{
        id: id,
        name: data.name,
        mark: data.markId ? String(data.markId) : 'no asignada',
        description: data.description || '',
        enable: data.enable ? '1' : '0',
        /*tags: data.productTag.map((t) => ({ id: t.tagId, name: t.tag.name
         * }))*/
      }}
    />
  );
}
