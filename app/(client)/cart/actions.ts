'use server';

import 'server-only';
import { orderCtrl } from '@/app/lib/compose/inversify';

export async function deleteProductAction(data: IDeleteProductAction) {
  return await orderCtrl.removeItem(data);
}

interface ICartAtion {
  userId: number;
  productId: number;
}
interface IDeleteProductAction extends ICartAtion {}
