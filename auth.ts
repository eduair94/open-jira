import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import clientPromise from './database/dbClient';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,
  callbacks: {
    async signIn(user) {
      //user.userId = user.user._id;
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.userId = user.id;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
