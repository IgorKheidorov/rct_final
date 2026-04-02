import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const redirects: Record<string, string> = {
    '/enrollee': '/admissions',
    '/specialties': '/programs',
    '/cookieCons': '/',
  }

  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url), 301)
  }

  if (pathname.startsWith('/enrollee/')) {
    const newPath = pathname.replace('/enrollee/', '/admissions/')
    return NextResponse.redirect(new URL(newPath, request.url), 301)
  }

  if (pathname.startsWith('/specialties/')) {
    const newPath = pathname.replace('/specialties/', '/programs/bachelor/')
    return NextResponse.redirect(new URL(newPath, request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/enrollee', '/enrollee/:path*', '/specialties', '/specialties/:path*', '/cookieCons'],
}
