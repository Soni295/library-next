import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    permissions: string[];
  }

  interface Session {
    user: {
      id: number;
      permissions: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    permissions: string[];
  }
}