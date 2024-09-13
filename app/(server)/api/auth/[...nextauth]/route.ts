import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { LoginInputSchema } from '@/app/lib/definitions/user';
import { ServerErr } from '@/app/lib/errors/serverErr';
import { userCtrl } from '@/app/lib/compose/inversify';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Manuel Rodrigez' },
        password: {
          label: 'contraseña',
          type: 'password',
          placeholder: '*******',
        },
      },
      async authorize(credentials, req) {
        const validationResult = LoginInputSchema.safeParse(credentials);
        if (!validationResult.success) {
          const err = validationResult.error.issues
            .map((err) => err.message)
            .join('<br>');

          throw new Error(err);
        }

        const result = await userCtrl.login(validationResult.data);
        if (result instanceof ServerErr) {
          throw new Error(result.desc);
        }
        return {
          email: result.email,
          name: result.name,
          id: result.id,
          image: undefined,
        };
      },
    }),
  ],
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
