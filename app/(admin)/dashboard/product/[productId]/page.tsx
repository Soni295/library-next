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
      productId={id}
      imgInfo={data.photo}
      productInfo={{
        name: data.name,
        basePrice: data.basePrice,
        mark: data.markId ? String(data.markId) : 'no asignada',
        description: data.description as string,
        quantity: data.quantity,
        minQuantity: data.minQuantity,
        code: data.code as string,
        enable: data.enable ? '1' : '0',
      }}
    />
  );
}
