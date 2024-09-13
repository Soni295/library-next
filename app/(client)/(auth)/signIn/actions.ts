'use server';

import 'server-only';
import { UserCreateInputSchema } from '@/app/lib/definitions/user';
import { ServerErr } from '@/app/lib/errors/serverErr';
import { userCtrl } from '@/app/lib/compose/inversify';

export async function signUp(_pre: any, formData: FormData) {
  const validationResult = UserCreateInputSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validationResult.success) {
    return {
      errors: {
        ...validationResult.error.flatten().fieldErrors,
      },
    };
  }

  const result = await userCtrl.signIn(validationResult.data);
  if (result instanceof ServerErr) {
    return { errors: { server: result.desc } };
  }
}
