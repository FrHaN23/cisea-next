import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: token,
    user:{
      nama: string | null
      username: string | null
      role: number | null
    } & DefaultSession['user']
  }

  interface user {
    nama?: string | null
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    maxAge?: number
  }
}