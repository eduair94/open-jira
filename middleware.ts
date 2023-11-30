import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    '/api/entries/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default auth((req) => {
  const auth = req.auth;
  const isAuth = req.nextUrl.pathname.startsWith('/auth');
  if (auth && isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (!auth && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '');
    const checkMongoIdRegex = new RegExp(/^[0-9a-fA-F]{24}$/);
    if (!checkMongoIdRegex.test(id)) {
      const url = req.nextUrl.clone();
      const message = `${id} is not a valid mongo id`;
      url.pathname = '/api/bad-request/' + encodeURIComponent(message);
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
});
