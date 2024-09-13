export const CONFIG = {
  JWT_TOKEN_SECRECT: process.env.NEXTAUTH_SECRET ?? 'example123',
  PRODUCTION: process.env.PRODUCTION === 'true',
  SALT_OF_PASSOWORD: 12,
} as const;
