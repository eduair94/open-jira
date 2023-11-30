import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import GitHubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
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
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // async signIn(params) {
    //   await db.connect();
    //   // Your sign-in logic here
    //   return true;
    // },
    // session(params) {
    //   const session = params.session;
    //   const user = params.user;
    //   // `user` parameter is the object received from the `signIn` callback
    //   // You can send a request to your database here to get more user info if needed
    //   if (session.user) session.user._id = user._id; // Assuming `_id` is a field in your user object
    //   return session;
    // },
  },
});

//satisfies NextAuthConfig;
