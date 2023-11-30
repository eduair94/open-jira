import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client/edge';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

//satisfies NextAuthConfig;
