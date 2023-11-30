import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    id: string;
  }

  interface User {
    _id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: number;
  }
}
