import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginInputSchema } from '@/app/lib/definitions/user';
import { ServerErr } from '@/app/lib/errors/serverErr';
import { userCtrl } from '@/app/lib/compose/inversify';
import { getUserPermissions } from '@/app/lib/session';

export const authOptions = {
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
      async authorize(credentials) {
        const validationResult = LoginInputSchema.safeParse(credentials);
        if (!validationResult.success) {
          throw new Error('Invalid credentials');
        }

        const result = await userCtrl.login(validationResult.data);
        if (result instanceof ServerErr) {
          throw new Error(result.desc);
        }
        const permissions = await getUserPermissions(result.id);

        return {
          email: result.email,
          name: result.name,
          id: result.id,
          image: undefined,
          permissions,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.permissions = user.permissions;
        token.id = user.id as number;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.permissions = token.permissions;
      session.user.id = token.id;
      return session;
    },
  },
} satisfies AuthOptions;
