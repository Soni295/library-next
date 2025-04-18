import { inject, injectable } from 'inversify';
import {
  ProductClientRepository,
  type ProductRepository,
} from '@/repositories/productRepository';
import { Product } from '@prisma/client';
import {
  ProductCreateInputSchema,
  ProductUpdateInputSchema,
} from '@/app/lib/definitions/product';
import { GeneralController } from './mainController';
import { handlerImgProduct } from '@/app/lib/utils/handleImage';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { TypesCompose } from '@/app/lib/compose';
import { PageSearchFilter, SearchFilterProductStock } from '@/repositories';

export interface IProduct extends Omit<Product, 'photos'> {
  photos: string[];
}

@injectable()
export class ProductController extends GeneralController {
  constructor(
    @inject(TypesCompose.productRepo)
    private readonly productRepository: ProductRepository,
  ) {
    super();
  }

  async update(formData: FormData) {
    this.userPermissionVerifier.isAdmin(); // cambiar luego

    try {
      const id = Number(formData.get('id'));

      if (!id)
        return {
          error: 'es necesario el id',
          status: '500',
        };
      const productDb = await this.productRepository.getById({ id });

      if (!productDb)
        return {
          error: 'No existe el producto que se desea actualizar.',
          status: '500',
        };

      const file = formData.get('photo') as File;
      const photo = await handlerImgProduct.saveFile(file);

      const mark = formData.get('mark');
      const validatedProduct = ProductUpdateInputSchema.safeParse({
        id,
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        basePrice: Number(formData.get('basePrice')),
        markId: mark === 'No asignada' ? null : Number(mark),
        enable: formData.get('enable') === '1',
        photo: photo,
        quantity: Number(formData.get('quantity')),
        minQuantity: Number(formData.get('minQuantity')),
      });

      if (!validatedProduct.success) {
        const err = validatedProduct.error.issues
          .map((err) => err.message)
          .join('<br>');
        return {
          error: err,
          status: '500',
        };
      }
      await this.productRepository.update(validatedProduct.data);
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        console.error('alto error PrismaClientValidationError', err.message);
      }

      if (err instanceof Error) {
        return {
          status: '500',
          error: err.message,
        };
      }
    }
    return { status: '200' };
  }

  async removeTag(info: { productId: number; tagId: number }) {
    this.userPermissionVerifier.isAdmin(); // cambiar luego
    try {
      await this.productRepository.removeTag(info);
    } catch (err) {
      if (err instanceof Error) {
        return {
          status: '500',
          error: err.message,
        };
      }
    }
    return { status: '200' };
  }

  async addTag(info: { productId: number; tagId: number }) {
    this.userPermissionVerifier.isAdmin(); // cambiar luego
    try {
      await this.productRepository.addTag(info);
    } catch (err) {
      if (err instanceof Error) {
        return {
          status: '500',
          error: err.message,
        };
      }
    }
    return { status: '200' };
  }

  async save(formData: FormData) {
    this.userPermissionVerifier.isAdmin(); // cambiar luego
    try {
      const file = formData.get('photo') as File;
      const photo = await handlerImgProduct.saveFile(file);
      const tagIds = JSON.parse(formData.get('tagIds') as string) as {
        id: number;
      }[];

      const mark = formData.get('mark');
      const validatedProduct = ProductCreateInputSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        basePrice: Number(formData.get('basePrice')),
        markId: mark === 'No asignada' ? null : Number(mark),
        enable: formData.get('enable') === '1',
        photo: photo,
        quantity: Number(formData.get('quantity')),
        minQuantity: Number(formData.get('minQuantity')),
        tagIds: tagIds.map((t) => t.id),
      });

      if (!validatedProduct.success) {
        const err = validatedProduct.error.issues
          .map((err) => err.message)
          .join('<br>');
        return {
          error: err,
          status: '500',
        };
      }
      await this.productRepository.save(validatedProduct.data);
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

  async getById(id: number) {
    const product = await this.productRepository.getById({ id });

    if (product == null) return null;
    return { ...product, basePrice: product.basePrice.toNumber() };
  }

  async getProductsByFilter(pageSearchFilter: SearchFilterProductStock) {
    return this.productRepository.getProductsByFilter(pageSearchFilter);
  }

  async getProductsByFilterForClient(
    pageSearchFilter: SearchFilterProductStock,
  ) {
    const productPage =
      await this.productRepository.getProductsByFilter(pageSearchFilter);
    const categories = await this.productRepository.getTagsProductsByFilter({
      text: pageSearchFilter.text,
    });

    const { data, ...rest } = productPage;

    const info = data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.basePrice.toNumber(),
      photo: product.photo,
    }));

    return {
      ...rest,
      data: {
        info,
        categories,
      },
    };
  }
}

@injectable()
export class ProductControllerClient {
  constructor(
    @inject(TypesCompose.productClientRepo)
    private readonly productRepository: ProductClientRepository,
  ) {}

  async getById(id: number) {
    const product = await this.productRepository.getById({ id });

    if (product == null) return null;
    return { ...product, basePrice: product.basePrice.toNumber() };
  }
}
