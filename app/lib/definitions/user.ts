import { Prisma } from '@prisma/client';
import z from 'zod';

const email = z
  .string({ message: 'El email es necesario' })
  .email({ message: 'Formato de email no valido' });

const name = z
  .string({ message: 'El nombre es necesario' })
  .trim()
  .min(4, { message: 'El nombre debe tener al menos 4 caracteres' })
  .max(50, { message: 'El nombre debe tener hasta 50 caracteres' });

const password = z
  .string({ message: 'La contraseña es necesaria.' })
  .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  .max(20, { message: 'La contraseña debe tener hasta 20 caracteres' });

export const LoginInputSchema = z.object({ email, password });
export const UserCreateInputSchema = z
  .object({
    name,
    email,
    password,
    confirmPassword: password,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'La contraseña no coincide',
        path: ['confirmPassword'],
      });
    }
  }) satisfies z.Schema<Prisma.UserCreateInput>;

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type UserCreateInputServer = Omit<UserCreateInput, 'confirmPassword'>;
export type LoginInput = z.infer<typeof LoginInputSchema>;
