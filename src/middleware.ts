import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이전페이지 참조여부
  const referrer = request.headers.get('referer');

  // 첫페에지를 로그인 페이지로 설정
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 예외 페이지
  if (pathname === '/login' || pathname.includes('/auth') || pathname.includes('/find')) {
    return NextResponse.next();
  }

  // 토큰 있을경우도 제외, 토큰 존재도 없을때 제외
  if (request.cookies.has('accessToken')) {
    return NextResponse.next();
  }

  // 주소창에 입력된 경우 토큰 삭제후 로그인으로 이동
  if (!referrer) {
    // 토큰 쿠키 삭제
    request.cookies.delete('accessToken');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 정상 요청은 계속 진행
  return NextResponse.next();
}
