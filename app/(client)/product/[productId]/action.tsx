'use server';

import 'server-only';
import { orderCtrl } from '@/app/lib/compose/inversify';

export async function addProductAction(data: {
  productId: number;
  userId: number;
  quantity: number;
}) {
  const res = await orderCtrl.addItem(data);
  console.log(res);
}

export async function deleteProductAction(data: {
  productId: number;
  userId: number;
}) {
  const res = await orderCtrl.removeItem(data);
  console.log(res);
}
