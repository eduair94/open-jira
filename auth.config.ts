import type { NextAuthConfig } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import GitHubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
const e = process.env;

const providers = [];
if (e.GOOGLE_CLIENT_ID && e.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: e.GOOGLE_CLIENT_ID,
      clientSecret: e.GOOGLE_CLIENT_SECRET,
    }),
  );
}
if (e.GITHUB_ID && e.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: e.GITHUB_ID,
      clientSecret: e.GITHUB_SECRET,
    }),
  );
}
if (e.CLIENT_ID && e.CLIENT_SECRET && e.ISSUER) {
  providers.push(
    Auth0Provider({
      clientId: e.CLIENT_ID,
      clientSecret: e.CLIENT_SECRET,
      issuer: e.ISSUER,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  );
}

export default {
  providers,
  theme: {
    colorScheme: 'dark',
  },
} satisfies NextAuthConfig;
