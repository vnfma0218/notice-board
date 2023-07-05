import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/test'];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  const token = await getToken({ req });
  if (isPathProtected) {
    console.log('token', token);
    if (!token) {
      console.log('req.url', req.url);
      const url = new URL(`/login`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  //   console.log('pathname', pathname);
  if (pathname === '/login' && token) {
    const url = new URL(`/`, req.url);
    return NextResponse.redirect(url);
  }
  return res;
}
