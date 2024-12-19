'use server';

import 'server-only';
import { orderCtrl } from '@/app/lib/compose/inversify';
import { revalidatePath } from 'next/cache';
import { CLIENT_PATH } from '@/app/lib/paths';

export async function addProductAction(data: IAddProductAction) {
  revalidatePath(CLIENT_PATH.CART, 'page');
  return await orderCtrl.addItem(data);
}

export async function deleteProductAction(data: IDeleteProductAction) {
  revalidatePath(CLIENT_PATH.CART, 'page');
  return await orderCtrl.removeItem(data);
}

interface ICartAtion {
  userId: number;
  productId: number;
}

interface IDeleteProductAction extends ICartAtion {}

interface IAddProductAction extends ICartAtion {
  quantity: number;
}
