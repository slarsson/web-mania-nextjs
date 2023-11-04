import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from './auth/jwt'
import { SESSION_COOKIE } from './auth/auth'

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)

  if (!cookie) {
    return NextResponse.redirect(req.nextUrl.origin + '/login')
  }

  try {
    await verify(cookie.value)
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(req.nextUrl.origin + '/login')
  }
}

export const config = {
  matcher: '/dashboard',
}
