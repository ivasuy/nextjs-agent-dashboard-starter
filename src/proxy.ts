import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/verify-otp'];
const AUTH_ROUTES = ['/login', '/verify-otp'];

export function proxy(request: NextRequest) {
  // In mock mode there is no real auth cookie — bypass all guards.
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== 'false') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Check for auth cookie (not JWT validation -- that's server-side)
  const hasToken = request.cookies.has('auth_token');

  // Unauthenticated user trying to access protected route
  if (!hasToken && !PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user trying to access auth routes
  if (hasToken && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
