'use server';

import 'server-only';
import { orderCtrl } from '@/app/lib/compose/inversify';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(data: FormData) {
  const info = {
    userId: Number(data.get('userId')),
    productId: Number(data.get('productId')),
  };
  await orderCtrl.removeItem(info);
  revalidatePath(CLIENT_PATH.CART, 'page');
}

interface ICartAtion {
  userId: number;
  productId: number;
}

import { CLIENT_PATH } from '@/app/lib/paths';

export async function addProductAction(data: IAddProductAction) {
  const info = await orderCtrl.addItem(data);
  revalidatePath(CLIENT_PATH.CART, 'page');
  return info;
}

interface ICartAtion {
  userId: number;
  productId: number;
}

interface IDeleteProductAction extends ICartAtion {}

interface IAddProductAction extends ICartAtion {
  quantity: number;
}
