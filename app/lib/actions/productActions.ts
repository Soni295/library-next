import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { handlerImgProduct } from '../utils/handleImage';
import { ProductCreateInputSchema } from '../definitions/product';
import { prisma } from '@/lib/prisma';
import { CLIENT_PATH, DASHBOARD_PATH } from '../paths';
import { revalidatePath } from 'next/cache';

function formatTagIds(data: string | null): { id: number }[] {
  if (!data) return [];
  return JSON.parse(data);
}

interface zErr {
  error: {
    issues: { message: string }[];
  };
}

function validatedErr(result: zErr) {
  return {
    err: result.error.issues.map((err) => err.message).join('<br>'),
    status: 500,
  };
}

export async function createProduct(formData: FormData) {
  try {
    const file = formData.get('photo') as File;
    const photo = await handlerImgProduct.saveFile(file);
    const tagIds = formatTagIds(formData.get('tagIds') as string);
    const mark = formData.get('mark');

    const validatedProduct = ProductCreateInputSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      basePrice: Number(formData.get('basePrice')),
      markId: mark === 'No asignada' ? null : Number(mark),
      enable: formData.get('enable') === '1',
      photo: photo,
      quantity: Number(formData.get('quantity')),
      minQuantity: Number(formData.get('minQuantity')),
      tagIds: tagIds.map((t) => t.id),
    });

    if (!validatedProduct.success) {
      return validatedErr(validatedProduct);
    }

    const data = {
      ...(mark === 'No asignada'
        ? {}
        : { mark: { connect: { id: Number(mark) } } }),
      name: formData.get('name'),
      description: formData.get('description'),
      code: formData.get('code'),
      basePrice: Number(formData.get('basePrice')),
      enable: formData.get('enable') === '1',
      photo: photo,
      quantity: Number(formData.get('quantity')),
      minQuantity: Number(formData.get('minQuantity')),
      productTag: {
        create: tagIds.map((t) => ({ tag: { connect: { id: t } } })),
      },
    };

    await prisma.product.create({ data });

    revalidatePath(CLIENT_PATH.HOME, 'page');
    revalidatePath(DASHBOARD_PATH.PRODUCT, 'page');
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      console.log('alto error PrismaClientValidationError', err.message);
    }
    console.log(err);

    if (err instanceof Error) {
      return {
        status: '500',
        error: err.message,
      };
    }
  }
  return { status: '200' };
}
