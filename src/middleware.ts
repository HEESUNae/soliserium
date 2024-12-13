import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl;
  //   const referrer = request.headers.get('referer');
  //   if (pathname === '/login') {
  //     return NextResponse.next();
  //   }
  //   if (!referrer) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  //   return NextResponse.next();
}
