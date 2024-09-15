import z from 'zod';

const name = z
  .string({ message: 'El nombre del producto es requerido' })
  .min(2, { message: 'El nombre del producto debe tener al menos 2 letras' });
const code = z.string().optional();
const description = z.string().optional();
const photo = z.string().min(1, { message: 'La foto es necesaria' });
const basePrice = z
  .number({ message: 'el precio base es requerido' })
  .nonnegative({ message: 'el precio base no puede ser negativo' });
const markId = z.number();
const enable = z.boolean();
const quantity = z.number();
const minQuantity = z.number();
//const categoryId = z.number()

export const ProductCreateInputSchema = z.object({
  name,
  description,
  basePrice,
  quantity,
  minQuantity,
  code,
  enable,
  markId,
  photo,
});

export type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>;

/*
(alias) type ProductPrisma = {
    id: number;
    name: string;
    price: Decimal;
    code: string | null;
    description: string | null;
    observation: string | null;
    photos: Prisma.JsonValue;
    markId: number;
    categoryId: number;
    createdAt: Date;
    updateAt: Date;
    deletedAt: Date | null;
}
*/