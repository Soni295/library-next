'use server';

import { orderCtrl } from '@/app/lib/compose/inversify';
import 'server-only';

export async function addProductAction(data: {
  productId: number;
  userId: number;
  quantity: number;
}) {
  const res = orderCtrl.addItem(data);
}
