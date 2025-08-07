import { Prisma } from '@prisma/client';
import z from 'zod';

const id = z.number();

const name = z
  .string({ message: 'El nombre es necesario' })
  .trim()
  .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  .max(25, { message: 'El nombre debe tener hasta 25 caracteres' });

const icon = z
  .string({ message: 'La descripcion no es necesaria.' })
  .optional();

const enable = z.boolean({ message: 'La descripcion no es necesaria.' });

export const MarkCreateSchema = z.object({
  name,
  icon,
  enable,
}) satisfies z.Schema<Prisma.MarkCreateInput>;
export type MarkCreate = z.infer<typeof MarkCreateSchema>;

export const MarkUpdateSchema = z.object({
  id,
  name,
  icon,
  enable,
}) satisfies z.Schema<Prisma.MarkUpdateInput>;
export type MarkUpdate = z.infer<typeof MarkUpdateSchema>;
