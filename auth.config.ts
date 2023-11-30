import type { NextAuthConfig } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import GitHubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      issuer: process.env.ISSUER,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
} satisfies NextAuthConfig;
