import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 테스트용으로 응답 헤더에 메시지 추가
  response.headers.set('x-middleware-test', 'middleware is working');

  const isAuthenticated = request.cookies.get('accessToken');
  
  if (!isAuthenticated && request.nextUrl.pathname !== '/login') {
    response.headers.set('x-middleware-test', 'redirect to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}